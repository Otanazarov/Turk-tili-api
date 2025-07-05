import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { env } from '../config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.validateOAuthLogin(req.user);

    console.log(env.FRONTEND_URL);

    return res.redirect(
      `${env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`,
    );
  }
}
