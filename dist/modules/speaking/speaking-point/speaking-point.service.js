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
exports.SpeakingPointService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SpeakingPointService = class SpeakingPointService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSpeakingPointDto) {
        const section = await this.prisma.speakingSection.findUnique({
            where: { id: createSpeakingPointDto.speakingSectionId },
        });
        if (!section) {
            throw new Error('Speaking section not found');
        }
        const speakingPoint = await this.prisma.speakingPoint.create({
            data: {
                sectionId: createSpeakingPointDto.speakingSectionId,
                order: createSpeakingPointDto.order,
                type: createSpeakingPointDto.type,
                questionText: createSpeakingPointDto.questionText,
            },
        });
        return speakingPoint;
    }
    async findAll(dto) {
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
    async findOne(id) {
        const speakingPoint = await this.prisma.speakingPoint.findUnique({
            where: { id },
        });
        if (!speakingPoint) {
            throw new Error('Speaking point not found');
        }
        return speakingPoint;
    }
    async update(id, updateDto) {
        const existing = await this.prisma.speakingPoint.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error('Speaking point not found');
        }
        const updated = await this.prisma.speakingPoint.update({
            where: { id },
            data: {
                order: updateDto.order ?? existing.order,
                type: updateDto.type ?? existing.type,
                questionText: updateDto.question ?? existing.questionText,
            },
        });
        return updated;
    }
    async remove(id) {
        const existing = await this.prisma.speakingPoint.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new Error('Speaking point not found');
        }
        return this.prisma.speakingPoint.delete({
            where: { id },
        });
    }
};
exports.SpeakingPointService = SpeakingPointService;
exports.SpeakingPointService = SpeakingPointService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpeakingPointService);
//# sourceMappingURL=speaking-point.service.js.map