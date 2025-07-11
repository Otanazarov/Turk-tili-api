"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
const ielts_calculator_1 = require("../../../common/utils/ielts-calculator");
let ExamService = class ExamService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submitAllAnswers(dto, userId) {
        const test = await this.prisma.test.findUnique({
            where: { id: dto.testId },
        });
        if (!test) {
            throw (0, http_error_1.HttpError)({ message: 'Test not found' });
        }
        const testResult = await this.prisma.testResult.create({
            data: {
                userId,
                testId: dto.testId,
                score: 0,
            },
        });
        let correctCount = 0;
        const allUserAnswers = [];
        for (const answerDto of dto.answers) {
            const question = await this.prisma.question.findUnique({
                where: { id: answerDto.questionId },
                include: { answers: true },
            });
            if (!question)
                continue;
            const correctAnswers = question.answers
                .filter((a) => a.correct)
                .map((a) => a.answer?.trim().toLowerCase());
            const userAnswerArray = Array.isArray(answerDto.userAnswer)
                ? answerDto.userAnswer.map((a) => a.trim().toLowerCase())
                : [answerDto.userAnswer.trim().toLowerCase()];
            const isCorrect = correctAnswers.length === userAnswerArray.length &&
                correctAnswers.every((a) => userAnswerArray.includes(a)) &&
                userAnswerArray.every((a) => correctAnswers.includes(a));
            if (isCorrect)
                correctCount++;
            allUserAnswers.push({
                resultId: testResult.id,
                questionId: question.id,
                userAnswer: Array.isArray(answerDto.userAnswer)
                    ? JSON.stringify(answerDto.userAnswer)
                    : answerDto.userAnswer,
                isCorrect,
            });
        }
        await this.prisma.userAnswer.createMany({
            data: allUserAnswers,
        });
        const bandScore = (0, ielts_calculator_1.calculateIELTSBand)(correctCount);
        await this.prisma.testResult.update({
            where: { id: testResult.id },
            data: {
                score: bandScore,
                completedAt: new Date(),
            },
        });
        return {
            message: 'Test submitted successfully',
            testResultId: testResult.id,
            correctCount,
            totalQuestions: dto.answers.length,
            score: bandScore,
        };
    }
    async findAllTestResults() {
        return this.prisma.testResult.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                },
                test: {
                    select: { id: true, title: true }
                },
                userAnswers: true,
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findUserTestAnswers(testResultId) {
        const testResult = await this.prisma.testResult.findMany({
            where: {
                id: testResultId,
            },
            include: {
                userAnswers: {
                    include: {
                        question: {
                            include: {
                                answers: {
                                    where: {
                                        correct: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return testResult;
    }
    async findOneUserTestResult(userId) {
        const testResult = await this.prisma.testResult.findMany({
            where: {
                userId,
            },
            include: {
                test: true,
            },
        });
        return testResult;
    }
    update(id, updateExamDto) {
        return `This action updates a #${id} exam`;
    }
    remove(id) {
        return `This action removes a #${id} exam`;
    }
};
exports.ExamService = ExamService;
exports.ExamService = ExamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamService);
//# sourceMappingURL=exam.service.js.map