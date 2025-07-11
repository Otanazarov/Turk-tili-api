import { PrismaService } from '../../prisma/prisma.service';
import { CreateOnlyWritingSubPartDto } from './dto/create-writing-sub-part.dto';
import { UpdateWritingSubPartDto } from './dto/update-writing-sub-part.dto';
export declare class WritingSubPartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOnlyWritingSubPartDto): Promise<{
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
    findAll(): Promise<({
        section: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        };
    } & {
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    })[]>;
    findOne(id: string): Promise<{
        section: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        };
    } & {
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
    update(id: string, dto: UpdateWritingSubPartDto): Promise<{
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
    remove(id: string): Promise<{
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
}
