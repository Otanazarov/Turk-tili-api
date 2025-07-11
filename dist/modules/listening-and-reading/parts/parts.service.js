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
exports.PartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let PartsService = class PartsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const test = await this.prisma.test.findUnique({
            where: { id: dto.testId },
        });
        if (!test) {
            throw new http_error_1.HttpError({ message: 'Test not found' });
        }
        return this.prisma.part.create({
            data: {
                number: dto.number,
                title: dto.title,
                audioUrl: dto.audioUrl,
                testId: dto.testId,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1, testId } = dto;
        const test = await this.prisma.test.findUnique({
            where: { id: testId },
        });
        if (!test) {
            throw new http_error_1.HttpError({ message: 'Test not found' });
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.part.findMany({
                where: { testId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.part.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const part = await this.prisma.part.findUnique({
            where: { id },
        });
        if (!part) {
            throw new http_error_1.HttpError({ message: 'Part not found' });
        }
        return part;
    }
    async update(id, updatePartDto) {
        const part = await this.prisma.part.findUnique({
            where: { id },
        });
        if (!part) {
            throw new http_error_1.HttpError({ message: 'Part not found' });
        }
        return this.prisma.part.update({
            where: { id },
            data: {
                number: updatePartDto.number ?? part.number,
                title: updatePartDto.title ?? part.title,
                audioUrl: updatePartDto.audioUrl ?? part.audioUrl,
            },
        });
    }
    async remove(id) {
        const part = await this.prisma.part.findUnique({
            where: { id },
        });
        if (!part) {
            throw new http_error_1.HttpError({ message: 'Part not found' });
        }
        return this.prisma.part.delete({
            where: { id },
        });
    }
};
exports.PartsService = PartsService;
exports.PartsService = PartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartsService);
//# sourceMappingURL=parts.service.js.map