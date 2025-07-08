// sms.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateSmsDto } from './dto/create-sms.dto';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { SendOtpDto } from './dto/sent-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp-code.dot';

@Injectable()
export class SmsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly token = process.env.ESKIZ_API_TOKEN;

  async sendSms(dto: CreateSmsDto) {
    try {
      console.log(dto);

      const res = await axios.post(
        'https://notify.eskiz.uz/api/message/sms/send',
        {
          mobile_phone: dto.phone,
          message: dto.message,
          from: '4546',
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );

      return res.data;
    } catch (error) {
      console.log(error);

      throw new Error(
        `SMS yuborishda xatolik: ${error.response?.data?.message || error.message}`,
      );
    }
  }

  async sendOtp(dto: SendOtpDto) {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 xonali OTP
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 daqiqa

    await this.prisma.otpCode.create({
      data: {
        phone: dto.phone,
        code,
        expiresAt,
      },
    });
 
    const smsMessage = `Tasdiqlash kodi: ${code}`;

    await this.sendSms({
      phone: dto.phone,
      message: smsMessage,
    });

    return { message: 'OTP yuborildi', phone: dto.phone };
  }

  // ✅ OTP NI TEKSHIRISH
  async verifyOtp(dto: VerifyOtpDto) {
    const record = await this.prisma.otpCode.findFirst({
      where: {
        phone: dto.phone,
        code: dto.code,
        verified: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) {
      throw new HttpError({ message: 'Kod noto‘g‘ri yoki eskirgan' });
    }

    await this.prisma.otpCode.update({
      where: { id: record.id },
      data: { verified: true },
    });

    return { message: 'Kod tasdiqlandi' };
  }
}
