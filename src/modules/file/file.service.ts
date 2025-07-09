import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { randomString } from 'src/common/utils/hash/random-string.util';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { File } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File, pathPrefix = ''): Promise<File> {
    if (!file) {
      throw new HttpError({ message: 'File not provided', statusCode: 400 });
    }

    const uploadPath = join(process.cwd(), 'uploads', pathPrefix);
    const fileName = `${randomString(16)}${extname(file.originalname)}`;
    const filePath = join(uploadPath, fileName);
    // Ensure URL path uses forward slashes
    const fileUrl = join('/uploads', pathPrefix, fileName).replace(/\\/g, '/');

    try {
      await fs.mkdir(uploadPath, { recursive: true });
      await fs.writeFile(filePath, file.buffer);

      // Save file metadata to database
      const dbFile = await this.prisma.file.create({
        data: {
          url: fileUrl,
          path: filePath,
          mimetype: file.mimetype,
          size: file.size,
        },
      });

      return dbFile;
    } catch (error) {
      throw new HttpError({
        message: 'Failed to save file',
        // You might want to log the original error for debugging
        // detail: error.message,
      });
    }
  }

  async findAll(): Promise<File[]> {
    return this.prisma.file.findMany();
  }

  async findOne(id: string): Promise<File> {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new HttpError({ message: 'File not found', statusCode: 404 });
    }
    return file;
  }

  async remove(id: string): Promise<File> {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new HttpError({ message: 'File not found', statusCode: 404 });
    }

    try {
      // First, delete from the database. If this fails, the file is not orphaned.
      const deletedRecord = await this.prisma.file.delete({ where: { id } });
      // Then, delete from the filesystem.
      await fs.unlink(file.path);
      return deletedRecord;
    } catch (error) {
      // Handle case where file doesn't exist on filesystem but does in DB
      if (error.code === 'ENOENT') {
        return this.prisma.file.delete({ where: { id } });
      }
      throw new HttpError({
        message: 'Error deleting file',
        // detail: error.message,
      });
    }
  }
}
