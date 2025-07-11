import { ExamService } from './exam.service';
import { Request } from 'express';
import { SubmitAnswersDto } from './dto/submit-test.dto';
import { UserAnswerDto } from './dto/user-answer.dto';
export declare class ExamController {
    private readonly examService;
    constructor(examService: ExamService);
    submitAll(dto: SubmitAnswersDto, req: Request): Promise<{
        message: string;
        testResultId: string;
        correctCount: number;
        totalQuestions: number;
        score: number;
    }>;
    getAllTest(): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
        };
        test: {
            title: string;
            id: string;
        };
        userAnswers: {
            userAnswer: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            questionId: string;
            resultId: string | null;
            isCorrect: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        score: number;
        userId: string;
        testId: string;
        startedAt: Date;
        completedAt: Date | null;
    })[]>;
    getAllUserAnswers(dto: UserAnswerDto): Promise<({
        userAnswers: ({
            question: {
                answers: {
                    answer: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    questionId: string;
                    variantText: string | null;
                    correct: boolean;
                }[];
            } & {
                number: number;
                type: import(".prisma/client").$Enums.QuestionType;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                sectionId: string;
                text: string | null;
            };
        } & {
            userAnswer: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            questionId: string;
            resultId: string | null;
            isCorrect: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        score: number;
        userId: string;
        testId: string;
        startedAt: Date;
        completedAt: Date | null;
    })[]>;
    getAllTestResults(req: Request): Promise<({
        test: {
            type: import(".prisma/client").$Enums.TestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            adminId: string | null;
            ieltsId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        score: number;
        userId: string;
        testId: string;
        startedAt: Date;
        completedAt: Date | null;
    })[]>;
}
