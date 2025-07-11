import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { FindAllFollowDto } from './dto/findAll-follow.dto';
import { Request } from 'express';
export declare class FollowsController {
    private readonly followsService;
    constructor(followsService: FollowsService);
    create(createFollowDto: CreateFollowDto, req: Request): Promise<{
        following: {
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
        follower: {
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        followingId: string;
        followerId: string;
    }>;
    findAll(dto: FindAllFollowDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            following: {
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
            follower: {
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
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            followingId: string;
            followerId: string;
        })[];
    }>;
    findOne(id: string): Promise<{
        following: {
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
        follower: {
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        followingId: string;
        followerId: string;
    }>;
    remove(followingId: string, req: Request): Promise<{
        message: string;
    }>;
}
