import { Injectable } from '@nestjs/common';
import { CreateSpeakingSubPartDto } from './dto/create-speaking-sub-part.dto';
import { UpdateSpeakingSubPartDto } from './dto/update-speaking-sub-part.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSpeakingSubPartDto } from './dto/findAll-speaking-sub-part.dto';

@Injectable()
export class SpeakingSubPartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpeakingSubPartDto: CreateSpeakingSubPartDto) {
    const speakingSection = await this.prisma.speakingSection.findUnique({
      where: {
        id: createSpeakingSubPartDto.speakingSectionId,
      },
    });
    if (!speakingSection) {
      throw new Error('Speaking section not found');
    }
    const subPart = await this.prisma.speakingSubPart.create({
      data: {
        label: createSpeakingSubPartDto.label,
        sectionId: createSpeakingSubPartDto.speakingSectionId,
        description: createSpeakingSubPartDto.description,
      },
    });
    return subPart;
  }

  async findAll(dto: FindAllSpeakingSubPartDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.speakingSubPart.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.speakingSubPart.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const subPart = await this.prisma.speakingSubPart.findUnique({
      where: { id },
    });
    if (!subPart) {
      throw new Error('Speaking SubPart not found');
    }
    return subPart;
  }

  async update(id: string, dto: UpdateSpeakingSubPartDto) {
    const existingSubPart = await this.prisma.speakingSubPart.findUnique({
      where: { id },
    });

    if (!existingSubPart) {
      throw new Error('Speaking SubPart not found');
    }

    const updatedSubPart = await this.prisma.speakingSubPart.update({
      where: { id },
      data: {
        label: dto.label ?? existingSubPart.label,
        description: dto.description ?? existingSubPart.description,
      },
    });

    return updatedSubPart;
  }

  async remove(id: string) {
    const existingSubPart = await this.prisma.speakingSubPart.findUnique({
      where: { id },
    });

    if (!existingSubPart) {
      throw new Error('Speaking SubPart not found');
    }

    await this.prisma.speakingSubPart.delete({
      where: { id },
    });

    return { message: 'Speaking SubPart deleted successfully', id };
  }
}
