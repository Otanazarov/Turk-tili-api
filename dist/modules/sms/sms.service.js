"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
let SmsService = class SmsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.token = process.env.ESKIZ_API_TOKEN;
    }
    async sendSms(dto) {
        try {
            console.log(dto);
            const res = await axios_1.default.post('https://notify.eskiz.uz/api/message/sms/send', {
                mobile_phone: dto.phone,
                message: dto.message,
                from: '4546',
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
            return res.data;
        }
        catch (error) {
            console.log(error);
            throw new Error(`SMS yuborishda xatolik: ${error.response?.data?.message || error.message}`);
        }
    }
    async sendOtp(dto) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 3 * 60 * 1000);
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
    async verifyOtp(dto) {
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
            throw new http_error_1.HttpError({ message: 'Kod noto‘g‘ri yoki eskirgan' });
        }
        await this.prisma.otpCode.update({
            where: { id: record.id },
            data: { verified: true },
        });
        return { message: 'Kod tasdiqlandi' };
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SmsService);
//# sourceMappingURL=sms.service.js.map