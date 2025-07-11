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
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let TestService = class TestService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTestWithAddition(dto) {
        const ielts = await this.prisma.ielts.findUnique({
            where: { id: dto.ieltsId },
        });
        if (!ielts) {
            throw (0, http_error_1.HttpError)({ message: 'IELTS not found' });
        }
        return this.prisma.test.create({
            data: {
                title: dto.title,
                description: dto.description || null,
                type: dto.type,
                ieltsId: dto.ieltsId,
                parts: {
                    create: dto.parts.map((part) => ({
                        number: part.number,
                        audioUrl: part.audioUrl || null,
                        title: part.title || null,
                        sections: {
                            create: part.sections.map((section) => ({
                                imageUrl: section.imageUrl || null,
                                title: section.title,
                                content: section.content,
                                hasBullets: false,
                                questions: {
                                    create: section.questions.map((q) => ({
                                        number: q.number,
                                        type: q.type,
                                        text: q.text,
                                        answers: {
                                            create: q.answers.map((a) => ({
                                                answer: a.answer,
                                                correct: a.correct,
                                                variantText: a.variantText || null,
                                            })),
                                        },
                                    })),
                                },
                            })),
                        },
                    })),
                },
            },
            include: {
                parts: {
                    include: {
                        sections: {
                            include: {
                                questions: {
                                    include: {
                                        answers: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async createTest(dto) {
        const ielts = await this.prisma.ielts.findUnique({
            where: { id: dto.ieltsId },
        });
        if (!ielts) {
            throw (0, http_error_1.HttpError)({ message: 'IELTS not found' });
        }
        return this.prisma.test.create({
            data: {
                title: dto.title ?? null,
                type: dto.type,
                description: dto.description ?? null,
                ieltsId: dto.ieltsId,
            },
        });
    }
    async findOneTestWithAddition(id) {
        const test = await this.prisma.test.findUnique({
            where: { id },
        });
        if (!test) {
            throw (0, http_error_1.HttpError)({ message: 'Test not found' });
        }
        return this.prisma.test.findUnique({
            where: { id },
            include: {
                parts: {
                    include: {
                        sections: {
                            include: {
                                questions: {
                                    include: {
                                        answers: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async findOneOnlyTest(id) {
        const test = await this.prisma.test.findUnique({
            where: { id },
        });
        if (!test) {
            throw (0, http_error_1.HttpError)({ message: 'Test not found' });
        }
        return test;
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.test.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    parts: {
                        include: {
                            sections: {
                                include: {
                                    questions: {
                                        include: {
                                            answers: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.test.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findAllOnlyTest(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.test.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.test.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async updateOnlyTest(id, dto) {
        const test = await this.prisma.test.findUnique({
            where: { id },
        });
        if (!test) {
            throw (0, http_error_1.HttpError)({ message: 'Test not found' });
        }
        if (dto.ieltsId) {
            const ielts = await this.prisma.ielts.findUnique({
                where: { id: dto.ieltsId },
            });
            if (!ielts) {
                throw (0, http_error_1.HttpError)({ message: 'IELTS not found' });
            }
        }
        return this.prisma.test.update({
            where: { id },
            data: {
                title: dto.title ?? test.title,
                type: dto.type ?? test.type,
                description: dto.description ?? test.description,
                ieltsId: dto.ieltsId ?? test.ieltsId,
            },
        });
    }
    async removeTest(id) {
        const test = await this.prisma.test.findUnique({ where: { id } });
        if (!test) {
            throw (0, http_error_1.HttpError)({ message: 'Test not found' });
        }
        return this.prisma.test.delete({
            where: { id },
        });
    }
    async removeOnlyTest(id) {
        return await this.prisma.test.delete({
            where: { id },
        });
    }
};
exports.TestService = TestService;
exports.TestService = TestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TestService);
//# sourceMappingURL=test.service.js.map