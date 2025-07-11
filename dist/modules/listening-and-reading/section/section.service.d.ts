import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllSectionDto } from './dto/findAll-section.dto';
export declare class SectionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSection(dto: CreateSectionDto): Promise<{
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        partId: string;
        hasBullets: boolean;
        imageUrl: string | null;
    }>;
    findAll(dto: FindAllSectionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string | null;
            partId: string;
            hasBullets: boolean;
            imageUrl: string | null;
        }[];
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SectionClient<{
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        partId: string;
        hasBullets: boolean;
        imageUrl: string | null;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateSectionDto: UpdateSectionDto): Promise<{
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        partId: string;
        hasBullets: boolean;
        imageUrl: string | null;
    }>;
    remove(id: string): Promise<{
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        partId: string;
        hasBullets: boolean;
        imageUrl: string | null;
    }>;
}
