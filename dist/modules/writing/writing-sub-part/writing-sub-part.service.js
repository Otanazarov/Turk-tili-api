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
exports.WritingSubPartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let WritingSubPartService = class WritingSubPartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const section = await this.prisma.writingSection.findUnique({
            where: { id: dto.sectionId },
        });
        if (!section) {
            throw new http_error_1.HttpError({ message: 'Writing section not found' });
        }
        return this.prisma.writingSubPart.create({
            data: {
                order: dto.order,
                label: dto.label,
                question: dto.question,
                sectionId: dto.sectionId,
            },
        });
    }
    async findAll() {
        return this.prisma.writingSubPart.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                section: true,
            },
        });
    }
    async findOne(id) {
        const subPart = await this.prisma.writingSubPart.findUnique({
            where: { id },
            include: { section: true },
        });
        if (!subPart) {
            throw new http_error_1.HttpError({ message: 'Writing subPart not found' });
        }
        return subPart;
    }
    async update(id, dto) {
        const subPart = await this.prisma.writingSubPart.findUnique({
            where: { id },
        });
        if (!subPart) {
            throw new http_error_1.HttpError({ message: 'Writing subPart not found' });
        }
        return this.prisma.writingSubPart.update({
            where: { id },
            data: {
                order: dto.order ?? subPart.order,
                label: dto.label ?? subPart.label,
                question: dto.question ?? subPart.question,
            },
        });
    }
    async remove(id) {
        const subPart = await this.prisma.writingSubPart.findUnique({
            where: { id },
        });
        if (!subPart) {
            throw new http_error_1.HttpError({ message: 'Writing subPart not found' });
        }
        return this.prisma.writingSubPart.delete({
            where: { id },
        });
    }
};
exports.WritingSubPartService = WritingSubPartService;
exports.WritingSubPartService = WritingSubPartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WritingSubPartService);
//# sourceMappingURL=writing-sub-part.service.js.map