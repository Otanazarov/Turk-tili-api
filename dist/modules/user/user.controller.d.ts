import { UserService } from './user.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: RegisterUserDto): Promise<string>;
    login(loginUserDto: LoginUserDto): Promise<{
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
    refresh(refreshUserDto: RefreshUserDto): Promise<{
        accessToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    findAll(query: FindAllUserQueryDto): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
