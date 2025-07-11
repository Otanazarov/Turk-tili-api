import { SpeakingSubmissionService } from './speaking-submission.service';
import { CreateSpeakingSubmissionDto } from './dto/create-speaking-submission.dto';
import { FindAllSpeakingSubmissionDto } from './dto/findAll-speaking.submission.dto';
import { UpdateSpeakingSubmissionDto } from './dto/update-speaking-submisson.dto';
import { Request } from 'express';
export declare class SpeakingSubmissionController {
    private readonly speakingSubmissionService;
    constructor(speakingSubmissionService: SpeakingSubmissionService);
    speechToText(files: Array<Express.Multer.File>): Promise<string>;
    create(createSpeakingSubmissionDto: CreateSpeakingSubmissionDto, files: Array<Express.Multer.File>, req: Request): Promise<{
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
    update(id: string, updateSpeakingSubmissionDto: UpdateSpeakingSubmissionDto): Promise<{
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
