import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { FindAllAnswerDto } from './dto/findAll-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: CreateAnswerDto): Promise<{
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
