import { AuthService } from './auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    getMe(req: Request): Promise<{
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
