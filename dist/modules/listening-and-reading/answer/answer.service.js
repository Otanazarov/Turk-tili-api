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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let AnswerService = class AnswerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAnswer(dto) {
        const question = await this.prisma.question.findUnique({
            where: { id: dto.questionId },
        });
        if (!question) {
            throw (0, http_error_1.HttpError)({ message: 'Question not found' });
        }
        return this.prisma.answer.create({
            data: {
                answer: dto.answer,
                correct: dto.correct,
                variantText: dto.variantText,
                questionId: dto.questionId,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1, questionId } = dto;
        const question = await this.prisma.question.findUnique({
            where: { id: questionId },
        });
        if (!question) {
            throw (0, http_error_1.HttpError)({ message: 'Question not found' });
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.answer.findMany({
                where: { questionId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.answer.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const answer = await this.prisma.answer.findUnique({
            where: { id },
        });
        if (!answer) {
            throw new http_error_1.HttpError({ message: 'Answer not found' });
        }
    }
    async update(id, updateAnswerDto) {
        const answer = await this.prisma.answer.findUnique({
            where: { id },
        });
        if (!answer) {
            throw new http_error_1.HttpError({ message: 'Answer not found' });
        }
        return this.prisma.answer.update({
            where: { id },
            data: {
                answer: updateAnswerDto.answer ?? answer.answer,
                correct: updateAnswerDto.correct ?? answer.correct,
                variantText: updateAnswerDto.variantText ?? answer.variantText,
            },
        });
    }
    async remove(id) {
        const answer = await this.prisma.answer.findUnique({
            where: { id },
        });
        if (!answer) {
            throw new http_error_1.HttpError({ message: 'Answer not found' });
        }
        const answerDelete = await this.prisma.answer.delete({
            where: { id },
        });
        return answerDelete;
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnswerService);
//# sourceMappingURL=answer.service.js.map