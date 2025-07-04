import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { sign, verify } from 'jsonwebtoken';
import {
  getTokenVersion,
  incrementTokenVersion,
} from 'src/common/auth/token-version.store';
import {
  getRefreshTokenVersion,
  incrementRefreshTokenVersion,
} from 'src/common/auth/refresh-token-version.store';
import { env } from 'src/common/config';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { CreateGoogleUserDto } from './dto/register-user-with-google.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createGoogleUser(profile: CreateGoogleUserDto) {
    return this.prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
        googleId: profile.googleId,
        provider: 'google',
      },
    });
  }

  async register(registerUserDto: RegisterUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { name: registerUserDto.name },
    });
    if (existingUser) {
      throw HttpError({ code: 'User with this name already exists' });
    }
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: registerUserDto.email },
    });
    if (existingEmail) {
      throw HttpError({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.password = hashedPassword;

    const user = await this.prisma.user.create({
      data: {
        email: registerUserDto.email,
        password: registerUserDto.password,
        provider: 'local',
        avatarUrl: registerUserDto.avatarUrl,
        name: registerUserDto.name,
        username: registerUserDto.username ?? null,
      },
    });
    delete user.password;
    return user;
  }

  async login(dto: LoginUserDto) {
    const { name, password } = dto;
    const user = await this.prisma.user.findFirst({
      where: { name: name },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw HttpError({ code: 'Invalid credentials' });
    }
    incrementTokenVersion(user.id.toString());
    incrementRefreshTokenVersion(user.id.toString());

    const tokenVersion = getTokenVersion(user.id.toString());
    const refreshTokenVersion = getRefreshTokenVersion(user.id.toString());

    const [accessToken, refreshToken] = [
      sign(
        { id: user.id, role: Role.USER, tokenVersion },
        env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '2h',
        },
      ),
      sign(
        { id: user.id, role: Role.USER, refreshTokenVersion },
        env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '1d',
        },
      ),
    ];

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: await bcrypt.hash(refreshToken, 10) },
    });

    delete user.password;
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshUserDto) {
    const token = dto.refreshToken;

    const userData = verify(token, env.REFRESH_TOKEN_SECRET) as {
      id: string;
      refreshTokenVersion: string;
    };

    if (!userData) throw HttpError({ code: 'LOGIN_FAILED' });

    const user = await this.prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (!user) {
      throw HttpError({ code: 'User not found' });
    }

    // Validate refresh token against database
    if (!user.refreshToken) {
      throw HttpError({ code: 'REFRESH_TOKEN_NOT_FOUND' });
    }

    const isRefreshTokenValid = await bcrypt.compare(
      dto.refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw HttpError({ code: 'INVALID_REFRESH_TOKEN' });
    }

    const currentRefreshVersion = getRefreshTokenVersion(user.id.toString());
    if (userData.refreshTokenVersion !== currentRefreshVersion) {
      throw HttpError({ code: 'TOKEN_INVALIDATED' });
    }

    incrementTokenVersion(user.id.toString());
    const currentTokenVersion = getTokenVersion(user.id.toString());

    const accessToken = sign(
      {
        id: user.id,
        tokenVersion: currentTokenVersion,
        role: Role.USER,
      },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2h' },
    );

    return { accessToken };
  }

  async logout(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    incrementTokenVersion(user.id.toString());
    incrementRefreshTokenVersion(user.id.toString());

    // Clear refresh token from database
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });

    return { message: 'Logged out successfully' };
  }

  async findAll(dto: FindAllUserQueryDto) {
    const { limit = 10, page = 1, name } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw HttpError({ code: 'User not found' });

    const updateData: any = {
      name: dto.name || user.name,
    };

    if (dto.newPassword) {
      if (!dto.oldPassword)
        throw HttpError({ code: 'The previous password is required' });

      const match = await bcrypt.compare(dto.oldPassword, user.password);
      if (!match) throw HttpError({ code: 'Wrong password' });

      updateData.password = await bcrypt.hash(dto.newPassword, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  // async remove(id: number) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id: id },
  //   });
  //   if (!user) {
  //     throw HttpError({ code: 'User not found' });
  //   }
  //   return await this.prisma.user.delete({
  //     where: { id: id },
  //   });
  // }
}
