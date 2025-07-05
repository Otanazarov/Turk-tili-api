import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { env } from '../config';
import { AuthorizationGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DecoratorWrapper } from './decorator.auth';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req.user);

    console.log('a', accessToken);

    return res.redirect(
      `${env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }

  @Get('me')
  @DecoratorWrapper('getMe', true, [Role.USER])
  async getMe(@Req() req: Request) {
    const userId = req.user['id'];
    return this.authService.getMe(userId);
  }
}
