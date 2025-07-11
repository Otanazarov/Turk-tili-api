import { PrismaService } from '../prisma/prisma.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateGoogleUserDto } from './dto/register-user-with-google.dto';
import { SmsService } from '../sms/sms.service';
export declare class UserService {
    private readonly prisma;
    private readonly smsService;
    constructor(prisma: PrismaService, smsService: SmsService);
    findByEmail(email: string): Promise<{
        name: string | null;
        password: string | null;
        refreshToken: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        username: string | null;
        avatarUrl: string | null;
        level: import(".prisma/client").$Enums.IELTSLevel | null;
        targetScore: number | null;
        googleId: string | null;
        provider: string;
    }>;
    createGoogleUser(profile: CreateGoogleUserDto): Promise<{
        name: string | null;
        password: string | null;
        refreshToken: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        username: string | null;
        avatarUrl: string | null;
        level: import(".prisma/client").$Enums.IELTSLevel | null;
        targetScore: number | null;
        googleId: string | null;
        provider: string;
    }>;
    register(registerUserDto: RegisterUserDto): Promise<string>;
    verifyOtp(): Promise<void>;
    login(dto: LoginUserDto): Promise<{
        user: {
            name: string | null;
            password: string | null;
            refreshToken: string | null;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            username: string | null;
            avatarUrl: string | null;
            level: import(".prisma/client").$Enums.IELTSLevel | null;
            targetScore: number | null;
            googleId: string | null;
            provider: string;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshUserDto): Promise<{
        accessToken: string;
    }>;
    logout(id: string): Promise<{
        message: string;
    }>;
    findAll(dto: FindAllUserQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string | null;
            password: string | null;
            refreshToken: string | null;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            username: string | null;
            avatarUrl: string | null;
            level: import(".prisma/client").$Enums.IELTSLevel | null;
            targetScore: number | null;
            googleId: string | null;
            provider: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string | null;
        password: string | null;
        refreshToken: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        username: string | null;
        avatarUrl: string | null;
        level: import(".prisma/client").$Enums.IELTSLevel | null;
        targetScore: number | null;
        googleId: string | null;
        provider: string;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        name: string | null;
        password: string | null;
        refreshToken: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        username: string | null;
        avatarUrl: string | null;
        level: import(".prisma/client").$Enums.IELTSLevel | null;
        targetScore: number | null;
        googleId: string | null;
        provider: string;
    }>;
}
