import { UpdateWritingSectionDto } from './dto/update-writing-section.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOnlyWritingSectionDto } from './dto/create-writing-section.dto';
import { FindAllOnlyWritingSectionDto } from './dto/findAll-writing-section.dto';
export declare class WritingSectionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOnlyWritingSectionDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        writingTestId: string;
    }>;
    findAll(dto: FindAllOnlyWritingSectionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        subParts: {
            question: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            label: string;
            sectionId: string;
        }[];
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        writingTestId: string;
    }>;
    update(id: string, dto: UpdateWritingSectionDto): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        writingTestId: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        writingTestId: string;
    }>;
}
