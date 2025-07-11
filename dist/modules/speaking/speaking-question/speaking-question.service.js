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
exports.SpeakingQuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let SpeakingQuestionService = class SpeakingQuestionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSectionQuestion(createSpeakingQuestionDto) {
        const section = await this.prisma.speakingSection.findUnique({
            where: { id: createSpeakingQuestionDto.speakingSectionId },
        });
        if (!section) {
            throw new Error('Speaking section not found');
        }
        const question = await this.prisma.speakingQuestion.create({
            data: {
                sectionId: createSpeakingQuestionDto.speakingSectionId,
                order: createSpeakingQuestionDto.order,
                questionText: createSpeakingQuestionDto.questionText,
            },
        });
        return question;
    }
    async createForSubPart(dto) {
        const { speakingSubPartId, order, questionText } = dto;
        const subPart = await this.prisma.speakingSubPart.findUnique({
            where: { id: speakingSubPartId },
        });
        if (!subPart) {
            throw new http_error_1.HttpError({ message: 'Speaking SubPart topilmadi' });
        }
        const newQuestion = await this.prisma.speakingQuestion.create({
            data: {
                subPartId: speakingSubPartId,
                order,
                questionText: questionText,
            },
        });
        return newQuestion;
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.speakingQuestion.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.speakingQuestion.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const question = await this.prisma.speakingQuestion.findUnique({
            where: { id },
        });
        if (!question) {
            throw new Error('Speaking question not found');
        }
        return question;
    }
    async update(id, dto) {
        const existing = await this.prisma.speakingQuestion.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error('Speaking question not found');
        }
        const updated = await this.prisma.speakingQuestion.update({
            where: { id },
            data: {
                order: dto.order,
                questionText: dto.questionText,
            },
        });
        return updated;
    }
    async remove(id) {
        const existing = await this.prisma.speakingQuestion.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error('Speaking question not found');
        }
        await this.prisma.speakingQuestion.delete({
            where: { id },
        });
        return { message: 'Speaking question deleted successfully', id };
    }
};
exports.SpeakingQuestionService = SpeakingQuestionService;
exports.SpeakingQuestionService = SpeakingQuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpeakingQuestionService);
//# sourceMappingURL=speaking-question.service.js.map