import { Injectable } from '@nestjs/common';
import { CreateWritingTestDto } from './dto/create-writing-test.dto';
import { UpdateWritingTestDto } from './dto/update-writing-test.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllWritingTestDto } from './dto/findAll-writingTest.dto';

@Injectable()
export class WritingTestService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createWritingTestDto: CreateWritingTestDto) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: createWritingTestDto.ieltsId },
    });
    if (!ielts) {
      throw new HttpError({ message: 'IELTS not found' });
    }

    return await this.prisma.writingTest.create({
      data: {
        title: createWritingTestDto.title,
        task1: createWritingTestDto.task1,
        task2: createWritingTestDto.task2,
        type: 'WRITING',
        task1Title: createWritingTestDto.task1Title,
        task2Title: createWritingTestDto.task2Title,
        instruction: createWritingTestDto.instruction,
        ieltsId: createWritingTestDto.ieltsId,
      },
    });
  }
  async findAll(dto: FindAllWritingTestDto) {
    const { limit = 10, page = 1 } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.writingTest.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.writingTest.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const writingTest = await this.prisma.writingTest.findUnique({
      where: { id },
    });
    if (!writingTest) {
      throw new HttpError({ message: 'Writing test not found' });
    }
    return writingTest;
  }

  async update(id: string, dto: UpdateWritingTestDto) {
    const existing = await this.prisma.writingTest.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new HttpError({
        message: 'Writing test not found',
        statusCode: 404,
      });
    }

    if (dto.ieltsId) {
      const ielts = await this.prisma.ielts.findUnique({
        where: { id: dto.ieltsId },
      });
      if (!ielts) {
        throw new HttpError({ message: 'IELTS not found', statusCode: 404 });
      }
    }

    return this.prisma.writingTest.update({
      where: { id },
      data: {
        title: dto.title ?? existing.title,
        task1: dto.task1 ?? existing.task1,
        task2: dto.task2 ?? existing.task2,
        task1Title: dto.task1Title ?? existing.task1Title,
        task2Title: dto.task2Title ?? existing.task2Title,
        instruction: dto.instruction ?? existing.instruction,
        type: existing.type,
        ieltsId: dto.ieltsId ?? existing.ieltsId,
      },
    });
  }

  async remove(id: string) {
    const writingTest = await this.prisma.writingTest.findUnique({
      where: { id },
    });
    if (!writingTest) {
      throw new HttpError({ message: 'writingTest not found' });
    }
    return this.prisma.writingTest.delete({ where: { id } });
  }
}
