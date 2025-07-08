import { Injectable } from '@nestjs/common';
import { CreateOnlySpeakingSectionDto } from './dto/create-speaking-section.dto';
import { UpdateSpeakingSectionDto } from './dto/update-speaking-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSpeakingSectionDto } from './dto/findAll-speaking-section.dto';

@Injectable()
export class SpeakingSectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOnlySpeakingSectionDto: CreateOnlySpeakingSectionDto) {
    const speakingTest = await this.prisma.speakingTest.findUnique({
      where: { id: createOnlySpeakingSectionDto.speakingTestId },
    });
    if (!speakingTest) {
      throw new HttpError({ message: ' Speaking test not found' });
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

  async findAll(dto: FindAllSpeakingSectionDto) {
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

  async findOne(id: string) {
    const speakingSection = await this.prisma.speakingSection.findUnique({
      where: { id: id },
    });
    if (!speakingSection) {
      throw new HttpError({ message: 'Speaking section not found' });
    }
    return speakingSection;
  }

  async update(id: string, dto: UpdateSpeakingSectionDto) {
    const section = await this.prisma.speakingSection.findUnique({
      where: { id },
    });

    if (!section) {
      throw new HttpError({ message: 'Speaking section not found' });
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

  async remove(id: string) {
    const section = await this.prisma.speakingSection.findUnique({
      where: { id },
    });

    if (!section) {
      throw new HttpError({
        message: 'Speaking section not found',
        statusCode: 404,
      });
    }

    await this.prisma.speakingSection.delete({
      where: { id },
    });

    return { message: 'Speaking section successfully deleted' };
  }
}
