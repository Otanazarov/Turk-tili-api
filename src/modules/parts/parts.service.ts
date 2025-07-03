import { Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllPartDto } from './dto/findAll-part.dto';

@Injectable()
export class PartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePartDto) {
    const test = await this.prisma.test.findUnique({
      where: { id: dto.testId },
    });
    if (!test) {
      throw new HttpError({ message: 'Test not found' });
    }
    return this.prisma.part.create({
      data: {
        number: dto.number,
        title: dto.title,
        audioUrl: dto.audioUrl,
        testId: dto.testId,
      },
    });
  }

  async findAll(dto: FindAllPartDto) {
    const { limit = 10, page = 1, testId } = dto;
    const test = await this.prisma.test.findUnique({
      where: { id: testId },
    });
    if (!test) {
      throw new HttpError({ message: 'Test not found' });
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.part.findMany({
        where: { testId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.part.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const part = await this.prisma.part.findUnique({
      where: { id },
    });
    if (!part) {
      throw new HttpError({ message: 'Part not found' });
    }
    return part;
  }

  async update(id: string, updatePartDto: UpdatePartDto) {
    const part = await this.prisma.part.findUnique({
      where: { id },
    });
    if (!part) {
      throw new HttpError({ message: 'Part not found' });
    }
    return this.prisma.part.update({
      where: { id },
      data: {
        number: updatePartDto.number ?? part.number,
        title: updatePartDto.title ?? part.title,
        audioUrl: updatePartDto.audioUrl ?? part.audioUrl,
      },
    });
  }

  async remove(id: string) {
    const part = await this.prisma.part.findUnique({
      where: { id },
    });
    if (!part) {
      throw new HttpError({ message: 'Part not found' });
    }
    return this.prisma.part.delete({
      where: { id },
    });
  }
}
