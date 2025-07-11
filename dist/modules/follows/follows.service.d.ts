import { CreateFollowDto } from './dto/create-follow.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllFollowDto } from './dto/findAll-follow.dto';
export declare class FollowsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFollowDto: CreateFollowDto, followerId: string): Promise<{
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
    remove(followerId: string, followingId: string): Promise<{
        message: string;
    }>;
}
