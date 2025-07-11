import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SubmitAnswersDto } from './dto/submit-test.dto';
export declare class ExamService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    submitAllAnswers(dto: SubmitAnswersDto, userId: string): Promise<{
        message: string;
        testResultId: string;
        correctCount: number;
        totalQuestions: number;
        score: number;
    }>;
    findAllTestResults(): Promise<({
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
    findUserTestAnswers(testResultId: string): Promise<({
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
    findOneUserTestResult(userId: string): Promise<({
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
    update(id: number, updateExamDto: UpdateExamDto): string;
    remove(id: number): string;
}
