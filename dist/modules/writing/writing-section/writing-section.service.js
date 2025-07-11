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
exports.WritingSectionService = void 0;
const http_error_1 = require("../../../common/exception/http.error");
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let WritingSectionService = class WritingSectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const writingTest = await this.prisma.writingTest.findUnique({
            where: { id: dto.writingTestId },
        });
        if (!writingTest) {
            throw new http_error_1.HttpError({ message: 'WritingTest not found' });
        }
        return this.prisma.writingSection.create({
            data: {
                writingTestId: dto.writingTestId,
                order: dto.order,
                title: dto.title,
                description: dto.description,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.writingSection.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.writingSection.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const section = await this.prisma.writingSection.findUnique({
            where: { id },
            include: { subParts: true },
        });
        if (!section) {
            throw new http_error_1.HttpError({ message: 'WritingSection not found' });
        }
        return section;
    }
    async update(id, dto) {
        const existing = await this.prisma.writingSection.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new http_error_1.HttpError({ message: 'WritingSection not found' });
        }
        return this.prisma.writingSection.update({
            where: { id },
            data: {
                order: dto.order ?? existing.order,
                title: dto.title ?? existing.title,
                description: dto.description ?? existing.description,
            },
        });
    }
    async remove(id) {
        const section = await this.prisma.writingSection.findUnique({
            where: { id },
        });
        if (!section) {
            throw new http_error_1.HttpError({ message: 'WritingSection not found' });
        }
        return this.prisma.writingSection.delete({ where: { id } });
    }
};
exports.WritingSectionService = WritingSectionService;
exports.WritingSectionService = WritingSectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WritingSectionService);
//# sourceMappingURL=writing-section.service.js.map