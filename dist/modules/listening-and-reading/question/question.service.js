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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let QuestionService = class QuestionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuestion(dto) {
        const section = await this.prisma.section.findUnique({
            where: { id: dto.sectionId },
        });
        if (!section) {
            throw (0, http_error_1.HttpError)({ message: 'Section not found' });
        }
        return this.prisma.question.create({
            data: {
                number: dto.number,
                text: dto.text,
                type: dto.type,
                sectionId: dto.sectionId,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1, sectionId } = dto;
        const section = await this.prisma.section.findUnique({
            where: { id: sectionId },
        });
        if (!section) {
            throw (0, http_error_1.HttpError)({ message: 'Section not found' });
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.question.findMany({
                where: { sectionId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.question.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const question = await this.prisma.question.findUnique({
            where: { id },
        });
        if (!question) {
            throw (0, http_error_1.HttpError)({ message: 'Question not found' });
        }
        return question;
    }
    async update(id, updateQuestionDto) {
        const question = await this.prisma.question.findUnique({
            where: { id },
        });
        if (!question) {
            throw (0, http_error_1.HttpError)({ message: 'Question not found' });
        }
        return this.prisma.question.update({
            where: { id },
            data: {
                number: updateQuestionDto.number ?? question.number,
                text: updateQuestionDto.text ?? question.text,
                type: updateQuestionDto.type ?? question.type,
            },
        });
    }
    async remove(id) {
        const question = await this.prisma.question.findUnique({
            where: { id },
        });
        if (!question) {
            throw (0, http_error_1.HttpError)({ message: 'Question not found' });
        }
        return this.prisma.question.delete({ where: { id } });
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionService);
//# sourceMappingURL=question.service.js.map