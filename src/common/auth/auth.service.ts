// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateGoogleUserDto } from 'src/modules/user/dto/register-user-with-google.dto';
import * as bcrypt from 'bcryptjs';
import { getTokenVersion, incrementTokenVersion } from './token-version.store';
import {
  getRefreshTokenVersion,
  incrementRefreshTokenVersion,
} from './refresh-token-version.store';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }> {
    let user = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    console.log(user);

    console.log(profile);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          name: profile.firstName,
          avatarUrl: profile.picture,
          googleId: profile.googleId,
          provider: 'google',
        },
      });
    }

    incrementTokenVersion(user.id.toString());
    incrementRefreshTokenVersion(user.id.toString());

    const tokenVersion = getTokenVersion(user.id.toString());
    const refreshTokenVersion = getRefreshTokenVersion(user.id.toString());

    const payload = {
      id: user.id,
      role: Role.USER,
      tokenVersion,
      refreshTokenVersion,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
