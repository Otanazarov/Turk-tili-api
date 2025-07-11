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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const jsonwebtoken_1 = require("jsonwebtoken");
const token_version_store_1 = require("../../common/auth/token-version.store");
const refresh_token_version_store_1 = require("../../common/auth/refresh-token-version.store");
const config_1 = require("../../common/config");
const client_1 = require("@prisma/client");
const sms_service_1 = require("../sms/sms.service");
let UserService = class UserService {
    constructor(prisma, smsService) {
        this.prisma = prisma;
        this.smsService = smsService;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async createGoogleUser(profile) {
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
    async register(registerUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { name: registerUserDto.name },
        });
        if (existingUser) {
            throw (0, http_error_1.HttpError)({ code: 'User with this name already exists' });
        }
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        registerUserDto.password = hashedPassword;
        const username = await this.prisma.user.findUnique({
            where: { username: registerUserDto.userName },
        });
        if (username) {
            throw new http_error_1.HttpError({ message: 'Username busy' });
        }
        const sms = await this.smsService.sendOtp({
            phone: registerUserDto.phoneNumber,
        });
        return 'Send OTP code';
    }
    async verifyOtp() {
    }
    async login(dto) {
        const { name, password } = dto;
        const user = await this.prisma.user.findFirst({
            where: { name: name },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw (0, http_error_1.HttpError)({ code: 'Invalid credentials' });
        }
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        (0, refresh_token_version_store_1.incrementRefreshTokenVersion)(user.id.toString());
        const tokenVersion = (0, token_version_store_1.getTokenVersion)(user.id.toString());
        const refreshTokenVersion = (0, refresh_token_version_store_1.getRefreshTokenVersion)(user.id.toString());
        const [accessToken, refreshToken] = [
            (0, jsonwebtoken_1.sign)({ id: user.id, role: client_1.Role.USER, tokenVersion }, config_1.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '2h',
            }),
            (0, jsonwebtoken_1.sign)({ id: user.id, role: client_1.Role.USER, refreshTokenVersion }, config_1.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d',
            }),
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
    async refresh(dto) {
        const token = dto.refreshToken;
        const userData = (0, jsonwebtoken_1.verify)(token, config_1.env.REFRESH_TOKEN_SECRET);
        if (!userData)
            throw (0, http_error_1.HttpError)({ code: 'LOGIN_FAILED' });
        const user = await this.prisma.user.findUnique({
            where: { id: userData.id },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        if (!user.refreshToken) {
            throw (0, http_error_1.HttpError)({ code: 'REFRESH_TOKEN_NOT_FOUND' });
        }
        const isRefreshTokenValid = await bcrypt.compare(dto.refreshToken, user.refreshToken);
        if (!isRefreshTokenValid) {
            throw (0, http_error_1.HttpError)({ code: 'INVALID_REFRESH_TOKEN' });
        }
        const currentRefreshVersion = (0, refresh_token_version_store_1.getRefreshTokenVersion)(user.id.toString());
        if (userData.refreshTokenVersion !== currentRefreshVersion) {
            throw (0, http_error_1.HttpError)({ code: 'TOKEN_INVALIDATED' });
        }
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        const currentTokenVersion = (0, token_version_store_1.getTokenVersion)(user.id.toString());
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: user.id,
            tokenVersion: currentTokenVersion,
            role: client_1.Role.USER,
        }, config_1.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        return { accessToken };
    }
    async logout(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        (0, refresh_token_version_store_1.incrementRefreshTokenVersion)(user.id.toString());
        await this.prisma.user.update({
            where: { id },
            data: { refreshToken: null },
        });
        return { message: 'Logged out successfully' };
    }
    async findAll(dto) {
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
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        return user;
    }
    async update(id, dto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        const updateData = {
            name: dto.name ?? user.name,
            username: dto.username ?? user.username,
            avatarUrl: dto.avatarUrl ?? user.avatarUrl,
            level: dto.level ?? user.level,
            targetScore: dto.targetScore ?? user.targetScore,
        };
        if (dto.username && dto.username !== user.username) {
            const usernameTaken = await this.prisma.user.findUnique({
                where: { username: dto.username },
            });
            if (usernameTaken) {
                throw (0, http_error_1.HttpError)({ code: 'Username is already taken' });
            }
            updateData.username = dto.username;
        }
        if (dto.newPassword) {
            if (!dto.oldPassword) {
                throw (0, http_error_1.HttpError)({ code: 'The previous password is required' });
            }
            const match = await bcrypt.compare(dto.oldPassword, user.password);
            if (!match)
                throw (0, http_error_1.HttpError)({ code: 'Wrong password' });
            updateData.password = await bcrypt.hash(dto.newPassword, 10);
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateData,
        });
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        sms_service_1.SmsService])
], UserService);
//# sourceMappingURL=user.service.js.map