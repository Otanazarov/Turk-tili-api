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
exports.SpeakingSubPartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SpeakingSubPartService = class SpeakingSubPartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSpeakingSubPartDto) {
        const speakingSection = await this.prisma.speakingSection.findUnique({
            where: {
                id: createSpeakingSubPartDto.speakingSectionId,
            },
        });
        if (!speakingSection) {
            throw new Error('Speaking section not found');
        }
        const subPart = await this.prisma.speakingSubPart.create({
            data: {
                label: createSpeakingSubPartDto.label,
                sectionId: createSpeakingSubPartDto.speakingSectionId,
                description: createSpeakingSubPartDto.description,
            },
        });
        return subPart;
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.speakingSubPart.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.speakingSubPart.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const subPart = await this.prisma.speakingSubPart.findUnique({
            where: { id },
        });
        if (!subPart) {
            throw new Error('Speaking SubPart not found');
        }
        return subPart;
    }
    async update(id, dto) {
        const existingSubPart = await this.prisma.speakingSubPart.findUnique({
            where: { id },
        });
        if (!existingSubPart) {
            throw new Error('Speaking SubPart not found');
        }
        const updatedSubPart = await this.prisma.speakingSubPart.update({
            where: { id },
            data: {
                label: dto.label ?? existingSubPart.label,
                description: dto.description ?? existingSubPart.description,
            },
        });
        return updatedSubPart;
    }
    async remove(id) {
        const existingSubPart = await this.prisma.speakingSubPart.findUnique({
            where: { id },
        });
        if (!existingSubPart) {
            throw new Error('Speaking SubPart not found');
        }
        await this.prisma.speakingSubPart.delete({
            where: { id },
        });
        return { message: 'Speaking SubPart deleted successfully', id };
    }
};
exports.SpeakingSubPartService = SpeakingSubPartService;
exports.SpeakingSubPartService = SpeakingSubPartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpeakingSubPartService);
//# sourceMappingURL=speaking-sub-part.service.js.map