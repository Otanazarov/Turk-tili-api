import { CreateSpeakingSubmissionDto } from './dto/create-speaking-submission.dto';
import { UpdateSpeakingSubmissionDto } from './dto/update-speaking-submisson.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllSpeakingSubmissionDto } from './dto/findAll-speaking.submission.dto';
import { OpenAIService } from '../../openAI/openAI.service';
import { FileService } from '../../file/file.service';
import { SpeakingQuestion, SpeakingSubmissionAnswer } from '@prisma/client';
export declare class SpeakingSubmissionService {
    private readonly prisma;
    private readonly openAIService;
    private readonly fileService;
    private readonly logger;
    constructor(prisma: PrismaService, openAIService: OpenAIService, fileService: FileService);
    speechToText(files: Array<Express.Multer.File>): Promise<string>;
    create(dto: CreateSpeakingSubmissionDto, files: Array<Express.Multer.File>, userId: string): Promise<{
        answers: ({
            question: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                sectionId: string | null;
                subPartId: string | null;
                order: number;
                questionText: string;
            };
        } & {
            text: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            audioUrl: string;
            questionId: string;
            submissionId: string;
        })[];
    } & {
        id: string;
        userId: string;
        speakingTestId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        score: number | null;
        submittedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    scoreSubmission(submissionId: string, answers: (SpeakingSubmissionAnswer & {
        question: SpeakingQuestion;
    })[]): Promise<void>;
    findAll(dto: FindAllSpeakingSubmissionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string | null;
                email: string | null;
                password: string | null;
                username: string | null;
                avatarUrl: string | null;
                role: import(".prisma/client").$Enums.Role;
                level: import(".prisma/client").$Enums.IELTSLevel | null;
                targetScore: number | null;
                googleId: string | null;
                provider: string;
                refreshToken: string | null;
            };
            speakingTest: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                ieltsId: string;
                type: string;
            };
        } & {
            id: string;
            userId: string;
            speakingTestId: string;
            aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
            score: number | null;
            submittedAt: Date;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string | null;
            password: string | null;
            username: string | null;
            avatarUrl: string | null;
            role: import(".prisma/client").$Enums.Role;
            level: import(".prisma/client").$Enums.IELTSLevel | null;
            targetScore: number | null;
            googleId: string | null;
            provider: string;
            refreshToken: string | null;
        };
        speakingTest: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            ieltsId: string;
            type: string;
        };
        answers: ({
            question: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                sectionId: string | null;
                subPartId: string | null;
                order: number;
                questionText: string;
            };
        } & {
            text: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            audioUrl: string;
            questionId: string;
            submissionId: string;
        })[];
    } & {
        id: string;
        userId: string;
        speakingTestId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        score: number | null;
        submittedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateSpeakingSubmissionDto): Promise<{
        id: string;
        userId: string;
        speakingTestId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        score: number | null;
        submittedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        speakingTestId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        score: number | null;
        submittedAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
