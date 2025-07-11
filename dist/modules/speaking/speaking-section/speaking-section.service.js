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
exports.SpeakingSectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const http_error_1 = require("../../../common/exception/http.error");
let SpeakingSectionService = class SpeakingSectionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOnlySpeakingSectionDto) {
        const speakingTest = await this.prisma.speakingTest.findUnique({
            where: { id: createOnlySpeakingSectionDto.speakingTestId },
        });
        if (!speakingTest) {
            throw new http_error_1.HttpError({ message: ' Speaking test not found' });
        }
        const speakingSection = await this.prisma.speakingSection.create({
            data: {
                order: createOnlySpeakingSectionDto.order,
                speakingTestId: createOnlySpeakingSectionDto.speakingTestId,
                title: createOnlySpeakingSectionDto.title,
                description: createOnlySpeakingSectionDto.description,
                images: createOnlySpeakingSectionDto.images,
                type: createOnlySpeakingSectionDto.type,
                content: createOnlySpeakingSectionDto.content,
            },
        });
        return speakingSection;
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.speakingSection.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.speakingSection.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const speakingSection = await this.prisma.speakingSection.findUnique({
            where: { id: id },
        });
        if (!speakingSection) {
            throw new http_error_1.HttpError({ message: 'Speaking section not found' });
        }
        return speakingSection;
    }
    async update(id, dto) {
        const section = await this.prisma.speakingSection.findUnique({
            where: { id },
        });
        if (!section) {
            throw new http_error_1.HttpError({ message: 'Speaking section not found' });
        }
        const updated = await this.prisma.speakingSection.update({
            where: { id },
            data: {
                order: dto.order ?? section.order,
                title: dto.title ?? section.title,
                description: dto.description ?? section.description,
                content: dto.content ?? section.content,
                images: dto.images ?? section.images,
                type: dto.type,
            },
        });
        return updated;
    }
    async remove(id) {
        const section = await this.prisma.speakingSection.findUnique({
            where: { id },
        });
        if (!section) {
            throw new http_error_1.HttpError({
                message: 'Speaking section not found',
                statusCode: 404,
            });
        }
        await this.prisma.speakingSection.delete({
            where: { id },
        });
        return { message: 'Speaking section successfully deleted' };
    }
};
exports.SpeakingSectionService = SpeakingSectionService;
exports.SpeakingSectionService = SpeakingSectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpeakingSectionService);
//# sourceMappingURL=speaking-section.service.js.map