import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllquestionDto } from './dto/findAll-question.dto';
export declare class QuestionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createQuestion(dto: CreateQuestionDto): Promise<{
        number: number;
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string;
        text: string | null;
    }>;
    findAll(dto: FindAllquestionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            number: number;
            type: import(".prisma/client").$Enums.QuestionType;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sectionId: string;
            text: string | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        number: number;
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string;
        text: string | null;
    }>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
        number: number;
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string;
        text: string | null;
    }>;
    remove(id: string): Promise<{
        number: number;
        type: import(".prisma/client").$Enums.QuestionType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string;
        text: string | null;
    }>;
}
