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
var SpeakingSubmissionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakingSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../../common/exception/http.error");
const prisma_service_1 = require("../../prisma/prisma.service");
const openAI_service_1 = require("../../openAI/openAI.service");
const file_service_1 = require("../../file/file.service");
let SpeakingSubmissionService = SpeakingSubmissionService_1 = class SpeakingSubmissionService {
    constructor(prisma, openAIService, fileService) {
        this.prisma = prisma;
        this.openAIService = openAIService;
        this.fileService = fileService;
        this.logger = new common_1.Logger(SpeakingSubmissionService_1.name);
    }
    async speechToText(files) {
        return await this.openAIService.speechToText(files[0].buffer);
    }
    async create(dto, files, userId) {
        const speakingTest = await this.prisma.speakingTest.findUnique({
            where: { id: dto.speakingTestId },
        });
        if (!speakingTest) {
            throw new http_error_1.HttpError({ message: 'Speaking test not found' });
        }
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new http_error_1.HttpError({ message: 'User not found' });
        }
        const filesByQuestionId = new Map();
        for (const file of files) {
            filesByQuestionId.set(file.fieldname, file);
        }
        const answersToCreate = await Promise.all(dto.answers.map(async (answer) => {
            const audioFile = filesByQuestionId.get(answer.questionId);
            if (!audioFile) {
                throw new http_error_1.HttpError({
                    message: `Audio file for question ${answer.questionId} not provided.`,
                });
            }
            const savedFile = await this.fileService.saveFile(audioFile, `speaking-submission/${userId}`);
            const audioToText = await this.openAIService.speechToText(audioFile.buffer);
            return {
                questionId: answer.questionId,
                audioUrl: savedFile.url,
                text: audioToText,
            };
        }));
        const submission = await this.prisma.speakingSubmission.create({
            data: {
                speakingTestId: dto.speakingTestId,
                userId: userId,
                answers: {
                    create: answersToCreate,
                },
            },
            include: {
                answers: {
                    include: {
                        question: true,
                    },
                },
            },
        });
        this.scoreSubmission(submission.id, submission.answers);
        return submission;
    }
    async scoreSubmission(submissionId, answers) {
        this.logger.log(`Starting to score submission ${submissionId}`);
        try {
            const questionsAndAnswers = answers.map((ans) => ({
                question: ans.question.questionText,
                answer: ans.text,
            }));
            if (questionsAndAnswers.length === 0) {
                this.logger.warn(`No answers to score for submission ${submissionId}`);
                return;
            }
            const assessment = await this.openAIService.getSpeakingAssessment(questionsAndAnswers);
            await this.prisma.speakingSubmission.update({
                where: { id: submissionId },
                data: {
                    score: assessment.score,
                    aiFeedback: assessment.feedback,
                },
            });
            this.logger.log(`Successfully scored submission ${submissionId}`);
        }
        catch (error) {
            this.logger.error(`Failed to score submission ${submissionId}`, error.stack);
        }
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.speakingSubmission.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: true,
                    speakingTest: true,
                },
            }),
            this.prisma.speakingSubmission.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const submission = await this.prisma.speakingSubmission.findUnique({
            where: { id },
            include: {
                user: true,
                speakingTest: true,
                answers: {
                    include: {
                        question: true,
                    },
                },
            },
        });
        if (!submission) {
            throw new http_error_1.HttpError({ message: 'Speaking submission not found' });
        }
        return submission;
    }
    async update(id, dto) {
        const submission = await this.prisma.speakingSubmission.findUnique({
            where: { id },
        });
        if (!submission) {
            throw new http_error_1.HttpError({ message: 'Speaking submission not found' });
        }
        return this.prisma.speakingSubmission.update({
            where: { id },
            data: {
                score: dto.score,
            },
        });
    }
    async remove(id) {
        const submission = await this.prisma.speakingSubmission.findUnique({
            where: { id },
        });
        if (!submission) {
            throw new http_error_1.HttpError({
                message: 'Speaking submission not found',
                statusCode: 404,
            });
        }
        return this.prisma.speakingSubmission.delete({
            where: { id },
        });
    }
};
exports.SpeakingSubmissionService = SpeakingSubmissionService;
exports.SpeakingSubmissionService = SpeakingSubmissionService = SpeakingSubmissionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openAI_service_1.OpenAIService,
        file_service_1.FileService])
], SpeakingSubmissionService);
//# sourceMappingURL=speaking-submission.service.js.map