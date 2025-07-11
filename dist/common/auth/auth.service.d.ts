import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateOAuthLogin(profile: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    getMe(userId: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        username: string;
        avatarUrl: string;
        level: import(".prisma/client").$Enums.IELTSLevel;
        targetScore: number;
        googleId: string;
        provider: string;
    }>;
}
