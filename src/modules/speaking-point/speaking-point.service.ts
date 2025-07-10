import { Injectable } from '@nestjs/common';
import { CreateSpeakingPointDto } from './dto/create-speaking-point.dto';
import { UpdateSpeakingPointDto } from './dto/update-speaking-point.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSpeakingPointDto } from './dto/findAll-speaking-point.dto';

@Injectable()
export class SpeakingPointService {
  constructor(private prisma: PrismaService) {}

  async create(createSpeakingPointDto: CreateSpeakingPointDto) {
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
  async findAll(dto: FindAllSpeakingPointDto) {
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

  async findOne(id: string) {
    const speakingPoint = await this.prisma.speakingPoint.findUnique({
      where: { id },
    });

    if (!speakingPoint) {
      throw new Error('Speaking point not found');
    }

    return speakingPoint;
  }

  async update(id: string, updateDto: UpdateSpeakingPointDto) {
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

  async remove(id: string) {
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
}
