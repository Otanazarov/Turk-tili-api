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
    update(id: string, updateSpeakingSubmissionDto: UpdateSpeakingSubmissionDto): Promise<{
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
