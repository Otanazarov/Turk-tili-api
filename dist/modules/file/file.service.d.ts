import { PrismaService } from '../prisma/prisma.service';
import { File } from '@prisma/client';
export declare class FileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    saveFile(file: Express.Multer.File, pathPrefix?: string): Promise<File>;
    findAll(): Promise<File[]>;
    findOne(id: string): Promise<File>;
    remove(id: string): Promise<File>;
}
