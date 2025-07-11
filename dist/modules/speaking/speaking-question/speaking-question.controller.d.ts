import { SpeakingQuestionService } from './speaking-question.service';
import { CreateSpeakingQuestionDto } from './dto/create-speaking-question.dto';
import { UpdateSpeakingQuestionDto } from './dto/update-speaking-question.dto';
import { FindAllSpeakingQuestionDto } from './dto/findAll-speaking-question.dto';
import { CreateSubPartSpeakingQuestionDto } from './dto/create-sub-part-question.dto';
export declare class SpeakingQuestionController {
    private readonly speakingQuestionService;
    constructor(speakingQuestionService: SpeakingQuestionService);
    create(createSpeakingQuestionDto: CreateSpeakingQuestionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string | null;
        subPartId: string | null;
    }>;
    createSubPartQuestion(dto: CreateSubPartSpeakingQuestionDto): Promise<{
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
    update(id: string, updateSpeakingQuestionDto: UpdateSpeakingQuestionDto): Promise<{
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
