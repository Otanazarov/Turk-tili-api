import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllPartDto } from './dto/findAll-part.dto';
export declare class PartsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePartDto): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
    findAll(dto: FindAllPartDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            number: number;
            description: string | null;
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            audioUrl: string | null;
            testId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
    update(id: string, updatePartDto: UpdatePartDto): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
    remove(id: string): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
}
