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
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let SectionService = class SectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSection(dto) {
        const part = await this.prisma.part.findUnique({
            where: { id: dto.partId },
        });
        if (!part) {
            throw (0, http_error_1.HttpError)({ message: 'Part not found' });
        }
        return this.prisma.section.create({
            data: {
                title: dto.title,
                content: dto.content,
                imageUrl: dto.imageUrl,
                partId: dto.partId,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1, partId } = dto;
        const part = await this.prisma.part.findUnique({
            where: { id: partId },
        });
        if (!part) {
            throw (0, http_error_1.HttpError)({ message: 'Part not found' });
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.section.findMany({
                where: { partId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.section.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    findOne(id) {
        const section = this.prisma.section.findUnique({
            where: { id },
        });
        if (!section) {
            throw (0, http_error_1.HttpError)({ message: 'Section not found' });
        }
        return section;
    }
    async update(id, updateSectionDto) {
        const section = await this.prisma.section.findUnique({
            where: { id },
        });
        if (!section) {
            throw (0, http_error_1.HttpError)({ message: 'Section not found' });
        }
        const updatedSection = this.prisma.section.update({
            where: { id },
            data: {
                title: updateSectionDto.title ?? section.title,
                content: updateSectionDto.content ?? section.content,
                imageUrl: updateSectionDto.imageUrl ?? section.imageUrl,
            },
        });
        if (!section) {
            throw (0, http_error_1.HttpError)({ message: 'Section not found' });
        }
        return updatedSection;
    }
    async remove(id) {
        const section = await this.prisma.section.findUnique({
            where: { id },
        });
        if (!section) {
            throw (0, http_error_1.HttpError)({ message: 'Section not found' });
        }
        return this.prisma.section.delete({ where: { id } });
    }
};
exports.SectionService = SectionService;
exports.SectionService = SectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SectionService);
//# sourceMappingURL=section.service.js.map