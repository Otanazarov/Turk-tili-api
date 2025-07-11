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
exports.WritingTestService = void 0;
const http_error_1 = require("../../../common/exception/http.error");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let WritingTestService = class WritingTestService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const ielts = await this.prisma.ielts.findUnique({
            where: { id: dto.ieltsId },
        });
        if (!ielts) {
            throw new http_error_1.HttpError({ message: 'IELTS not found' });
        }
        return this.prisma.writingTest.create({
            data: {
                title: dto.title,
                instruction: dto.instruction,
                type: 'WRITING',
                ieltsId: dto.ieltsId,
                sections: {
                    create: dto.sections.map((section) => ({
                        order: section.order,
                        title: section.title,
                        description: section.description,
                        subParts: {
                            create: section.subParts?.map((sub) => ({
                                order: sub.order,
                                label: sub.label,
                                question: sub.question,
                            })) || [],
                        },
                    })),
                },
            },
            include: {
                sections: {
                    include: {
                        subParts: true,
                    },
                },
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.writingTest.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    sections: {
                        include: { subParts: true },
                    },
                    ielts: true,
                },
            }),
            this.prisma.writingTest.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const test = await this.prisma.writingTest.findUnique({
            where: { id },
            include: {
                sections: {
                    include: {
                        subParts: true,
                    },
                },
            },
        });
        if (!test) {
            throw new http_error_1.HttpError({ message: 'Writing test not found' });
        }
        return test;
    }
    async update(id, dto) {
        const existing = await this.prisma.writingTest.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new http_error_1.HttpError({ message: 'Writing test not found', statusCode: 404 });
        }
        if (dto.ieltsId) {
            const ielts = await this.prisma.ielts.findUnique({ where: { id: dto.ieltsId } });
            if (!ielts) {
                throw new http_error_1.HttpError({ message: 'IELTS not found', statusCode: 404 });
            }
        }
        return this.prisma.writingTest.update({
            where: { id },
            data: {
                title: dto.title ?? existing.title,
                instruction: dto.instruction ?? existing.instruction,
                ieltsId: dto.ieltsId ?? existing.ieltsId,
            },
        });
    }
    async remove(id) {
        const test = await this.prisma.writingTest.findUnique({ where: { id } });
        if (!test) {
            throw new http_error_1.HttpError({ message: 'Writing test not found' });
        }
        return this.prisma.writingTest.delete({ where: { id } });
    }
};
exports.WritingTestService = WritingTestService;
exports.WritingTestService = WritingTestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WritingTestService);
//# sourceMappingURL=writing-test.service.js.map