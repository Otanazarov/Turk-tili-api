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
                order: number;
                questionText: string;
                sectionId: string | null;
                subPartId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            text: string | null;
            questionId: string;
            audioUrl: string;
            submissionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        speakingTestId: string;
        score: number | null;
        userId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        submittedAt: Date;
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
                name: string | null;
                password: string | null;
                refreshToken: string | null;
                id: string;
                role: import(".prisma/client").$Enums.Role;
                createdAt: Date;
                updatedAt: Date;
                email: string | null;
                username: string | null;
                avatarUrl: string | null;
                level: import(".prisma/client").$Enums.IELTSLevel | null;
                targetScore: number | null;
                googleId: string | null;
                provider: string;
            };
            speakingTest: {
                type: string;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                ieltsId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            speakingTestId: string;
            score: number | null;
            userId: string;
            aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
            submittedAt: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        user: {
            name: string | null;
            password: string | null;
            refreshToken: string | null;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            username: string | null;
            avatarUrl: string | null;
            level: import(".prisma/client").$Enums.IELTSLevel | null;
            targetScore: number | null;
            googleId: string | null;
            provider: string;
        };
        speakingTest: {
            type: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            ieltsId: string;
        };
        answers: ({
            question: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                questionText: string;
                sectionId: string | null;
                subPartId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            text: string | null;
            questionId: string;
            audioUrl: string;
            submissionId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        speakingTestId: string;
        score: number | null;
        userId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        submittedAt: Date;
    }>;
    update(id: string, dto: UpdateSpeakingSubmissionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        speakingTestId: string;
        score: number | null;
        userId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        submittedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        speakingTestId: string;
        score: number | null;
        userId: string;
        aiFeedback: import("@prisma/client/runtime/library").JsonValue | null;
        submittedAt: Date;
    }>;
}
