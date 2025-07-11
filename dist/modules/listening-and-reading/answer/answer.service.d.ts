import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllAnswerDto } from './dto/findAll-answer.dto';
export declare class AnswerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAnswer(dto: CreateAnswerDto): Promise<{
        answer: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionId: string;
        variantText: string | null;
        correct: boolean;
    }>;
    findAll(dto: FindAllAnswerDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            answer: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            questionId: string;
            variantText: string | null;
            correct: boolean;
        }[];
    }>;
    findOne(id: string): Promise<void>;
    update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<{
        answer: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionId: string;
        variantText: string | null;
        correct: boolean;
    }>;
    remove(id: string): Promise<{
        answer: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        questionId: string;
        variantText: string | null;
        correct: boolean;
    }>;
}
