import { CreateSmsDto } from './dto/create-sms.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SendOtpDto } from './dto/sent-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp-code.dot';
export declare class SmsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly token;
    sendSms(dto: CreateSmsDto): Promise<any>;
    sendOtp(dto: SendOtpDto): Promise<{
        message: string;
        phone: string;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        message: string;
    }>;
}
