import { CreateSpeakingQuestionDto } from './dto/create-speaking-question.dto';
import { UpdateSpeakingQuestionDto } from './dto/update-speaking-question.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllSpeakingQuestionDto } from './dto/findAll-speaking-question.dto';
import { CreateSubPartSpeakingQuestionDto } from './dto/create-sub-part-question.dto';
export declare class SpeakingQuestionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSectionQuestion(createSpeakingQuestionDto: CreateSpeakingQuestionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string | null;
        subPartId: string | null;
    }>;
    createForSubPart(dto: CreateSubPartSpeakingQuestionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string | null;
        subPartId: string | null;
    }>;
    findAll(dto: FindAllSpeakingQuestionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            questionText: string;
            sectionId: string | null;
            subPartId: string | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string | null;
        subPartId: string | null;
    }>;
    update(id: string, dto: UpdateSpeakingQuestionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string | null;
        subPartId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
