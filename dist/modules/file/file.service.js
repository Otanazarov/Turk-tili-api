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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const random_string_util_1 = require("../../common/utils/hash/random-string.util");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
let FileService = class FileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async saveFile(file, pathPrefix = '') {
        if (!file) {
            throw new http_error_1.HttpError({ message: 'File not provided', statusCode: 400 });
        }
        const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', pathPrefix);
        const fileName = `${(0, random_string_util_1.randomString)(16)}${(0, path_1.extname)(file.originalname)}`;
        const filePath = (0, path_1.join)(uploadPath, fileName);
        const fileUrl = (0, path_1.join)('/uploads', pathPrefix, fileName).replace(/\\/g, '/');
        try {
            await fs_1.promises.mkdir(uploadPath, { recursive: true });
            await fs_1.promises.writeFile(filePath, file.buffer);
            const dbFile = await this.prisma.file.create({
                data: {
                    url: fileUrl,
                    path: filePath,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            });
            return dbFile;
        }
        catch (error) {
            throw new http_error_1.HttpError({
                message: 'Failed to save file',
            });
        }
    }
    async findAll() {
        return this.prisma.file.findMany();
    }
    async findOne(id) {
        const file = await this.prisma.file.findUnique({ where: { id } });
        if (!file) {
            throw new http_error_1.HttpError({ message: 'File not found', statusCode: 404 });
        }
        return file;
    }
    async remove(id) {
        const file = await this.prisma.file.findUnique({ where: { id } });
        if (!file) {
            throw new http_error_1.HttpError({ message: 'File not found', statusCode: 404 });
        }
        try {
            const deletedRecord = await this.prisma.file.delete({ where: { id } });
            await fs_1.promises.unlink(file.path);
            return deletedRecord;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return this.prisma.file.delete({ where: { id } });
            }
            throw new http_error_1.HttpError({
                message: 'Error deleting file',
            });
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FileService);
//# sourceMappingURL=file.service.js.map