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
exports.IeltsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
let IeltsService = class IeltsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createIeltsDto) {
        return this.prisma.ielts.create({
            data: {
                title: createIeltsDto.title,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.ielts.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    WritingTest: true,
                    SpeakingTest: true,
                    tests: true,
                },
            }),
            this.prisma.ielts.count(),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const ielts = await this.prisma.ielts.findUnique({
            where: { id },
            include: {
                tests: true,
            },
        });
        if (!ielts) {
            throw new http_error_1.HttpError({ message: `IELTS with ID ${id} not found` });
        }
        return ielts;
    }
    async update(id, updateIeltDto) {
        try {
            return await this.prisma.ielts.update({
                where: { id },
                data: {
                    title: updateIeltDto.title,
                },
            });
        }
        catch (error) {
            throw new http_error_1.HttpError({ message: `IELTS with ID ${id} not found` });
        }
    }
    async remove(id) {
        try {
            return await this.prisma.ielts.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new http_error_1.HttpError({ message: `IELTS with ID ${id} not found` });
        }
    }
};
exports.IeltsService = IeltsService;
exports.IeltsService = IeltsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IeltsService);
//# sourceMappingURL=ielts.service.js.map