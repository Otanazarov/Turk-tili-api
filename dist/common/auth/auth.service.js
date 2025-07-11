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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../modules/prisma/prisma.service");
const bcrypt = require("bcryptjs");
const token_version_store_1 = require("./token-version.store");
const refresh_token_version_store_1 = require("./refresh-token-version.store");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateOAuthLogin(profile) {
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
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        (0, refresh_token_version_store_1.incrementRefreshTokenVersion)(user.id.toString());
        const tokenVersion = (0, token_version_store_1.getTokenVersion)(user.id.toString());
        const refreshTokenVersion = (0, refresh_token_version_store_1.getRefreshTokenVersion)(user.id.toString());
        const payload = {
            id: user.id,
            role: client_1.Role.USER,
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
    async getMe(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                avatarUrl: true,
                level: true,
                targetScore: true,
                googleId: true,
                provider: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map