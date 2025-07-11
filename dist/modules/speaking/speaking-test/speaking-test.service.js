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
exports.SpeakingTestService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../../common/exception/http.error");
const prisma_service_1 = require("../../prisma/prisma.service");
const openAI_service_1 = require("../../openAI/openAI.service");
let SpeakingTestService = class SpeakingTestService {
    constructor(prisma, openAIService) {
        this.prisma = prisma;
        this.openAIService = openAIService;
    }
    async convertAudioToText(audioBuffer) {
        return this.openAIService.speechToText(audioBuffer);
    }
    async create(dto) {
        const ielts = await this.prisma.ielts.findUnique({
            where: { id: dto.ieltsId },
        });
        if (!ielts) {
            throw new http_error_1.HttpError({ message: 'IELTS not found' });
        }
        return this.prisma.speakingTest.create({
            data: {
                title: dto.title,
                ieltsId: dto.ieltsId,
                type: 'SPEAKING',
                sections: {
                    create: dto.sections.map((section) => ({
                        order: section.order,
                        title: section.title,
                        description: section.description,
                        images: section.images || [],
                        type: section.type,
                        content: section.content || null,
                        points: {
                            create: section.points || [],
                        },
                        subParts: section.subParts
                            ? {
                                create: section.subParts.map((sub) => ({
                                    label: sub.label,
                                    description: sub.description,
                                    questions: {
                                        create: sub.questions.map((q) => ({
                                            order: q.order,
                                            questionText: q.question,
                                        })),
                                    },
                                })),
                            }
                            : undefined,
                        questions: section.questions
                            ? {
                                create: section.questions.map((q) => ({
                                    order: q.order,
                                    questionText: q.question,
                                })),
                            }
                            : undefined,
                    })),
                },
            },
            include: {
                sections: {
                    include: {
                        points: true,
                        subParts: { include: { questions: true } },
                        questions: true,
                    },
                },
            },
        });
    }
    async createOnlySpeakingTest(dto) {
        const ielts = await this.prisma.ielts.findUnique({
            where: { id: dto.ieltsId },
        });
        if (!ielts) {
            throw new http_error_1.HttpError({ message: 'Ielts not found' });
        }
        const speakingTest = await this.prisma.speakingTest.create({
            data: {
                title: dto.title,
                ieltsId: dto.ieltsId,
                type: 'SPEAKING',
            },
        });
        return speakingTest;
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.speakingTest.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    sections: {
                        include: {
                            subParts: {
                                include: {
                                    questions: true,
                                },
                            },
                            questions: true,
                        },
                    },
                    ielts: true,
                },
            }),
            this.prisma.speakingTest.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findAllOnlySpeakingTest(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.speakingTest.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.speakingTest.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOneOnlySpeakingTest(id) {
        const speakingTest = await this.prisma.speakingTest.findUnique({
            where: { id },
        });
        if (!speakingTest) {
            throw new http_error_1.HttpError({ message: 'SpeakingTest not found' });
        }
        return speakingTest;
    }
    async findOne(id) {
        const speakingTest = await this.prisma.speakingTest.findUnique({
            where: { id },
            include: {
                sections: {
                    include: {
                        subParts: {
                            include: {
                                questions: true,
                            },
                        },
                        questions: true,
                    },
                },
            },
        });
        if (!speakingTest) {
            throw new http_error_1.HttpError({ message: 'SpeakingTest not found' });
        }
        return speakingTest;
    }
    async update(id, dto) {
        const speakingTest = await this.prisma.speakingTest.findUnique({
            where: { id },
        });
        if (!speakingTest) {
            throw new http_error_1.HttpError({ message: 'SpeakingTest not found' });
        }
        const ielts = await this.prisma.ielts.findUnique({
            where: { id: dto.ieltsId },
        });
        if (!ielts) {
            throw new http_error_1.HttpError({ message: 'Ielts not found' });
        }
        return this.prisma.speakingTest.update({
            where: { id },
            data: {
                title: dto.title ?? speakingTest.title,
                ieltsId: dto.ieltsId ?? speakingTest.ieltsId,
            },
        });
    }
    async remove(id) {
        const test = await this.prisma.speakingTest.findUnique({
            where: { id },
        });
        if (!test) {
            throw new http_error_1.HttpError({
                message: 'Speaking test not found',
                statusCode: 404,
            });
        }
        return this.prisma.speakingTest.delete({
            where: { id },
        });
    }
};
exports.SpeakingTestService = SpeakingTestService;
exports.SpeakingTestService = SpeakingTestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        openAI_service_1.OpenAIService])
], SpeakingTestService);
//# sourceMappingURL=speaking-test.service.js.map