import { HttpError } from 'src/common/exception/http.error';
import { UpdateWritingSectionDto } from './dto/update-writing-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOnlyWritingSectionDto } from './dto/create-writing-section.dto';
import { FindAllOnlyWritingSectionDto } from './dto/findAll-writing-section.dto';

@Injectable()
export class WritingSectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOnlyWritingSectionDto) {
    const writingTest = await this.prisma.writingTest.findUnique({
      where: { id: dto.writingTestId },
    });

    if (!writingTest) {
      throw new HttpError({ message: 'WritingTest not found' });
    }

    return this.prisma.writingSection.create({
      data: {
        writingTestId: dto.writingTestId,
        order: dto.order,
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async findAll(dto: FindAllOnlyWritingSectionDto) {
    const { limit = 10, page = 1 } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.writingSection.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.writingSection.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const section = await this.prisma.writingSection.findUnique({
      where: { id },
      include: { subParts: true },
    });

    if (!section) {
      throw new HttpError({ message: 'WritingSection not found' });
    }

    return section;
  }

  async update(id: string, dto: UpdateWritingSectionDto) {
    const existing = await this.prisma.writingSection.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new HttpError({ message: 'WritingSection not found' });
    }

    return this.prisma.writingSection.update({
      where: { id },
      data: {
        order: dto.order ?? existing.order,
        title: dto.title ?? existing.title,
        description: dto.description ?? existing.description,
      },
    });
  }

  async remove(id: string) {
    const section = await this.prisma.writingSection.findUnique({
      where: { id },
    });

    if (!section) {
      throw new HttpError({ message: 'WritingSection not found' });
    }

    return this.prisma.writingSection.delete({ where: { id } });
  }
}
