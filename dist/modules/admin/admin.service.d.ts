import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllAdminQueryDto } from './dto/findAll-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { RefreshAdminDto } from './dto/refresh-admin.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createAdminDto: CreateAdminDto): Promise<{
        name: string;
        password: string;
        refreshToken: string | null;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginAdminDto): Promise<{
        admin: {
            name: string;
            password: string;
            refreshToken: string | null;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshAdminDto): Promise<{
        accessToken: string;
    }>;
    logout(id: string): Promise<{
        message: string;
    }>;
    findAll(dto: FindAllAdminQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            id: string;
            createdAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, dto: UpdateAdminDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
    }>;
}
