import { Injectable } from '@nestjs/common';
import { CreateSpeakingQuestionDto } from './dto/create-speaking-question.dto';
import { UpdateSpeakingQuestionDto } from './dto/update-speaking-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSpeakingQuestionDto } from './dto/findAll-speaking-question.dto';

@Injectable()
export class SpeakingQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpeakingQuestionDto: CreateSpeakingQuestionDto) {
    const section = await this.prisma.speakingSection.findUnique({
      where: { id: createSpeakingQuestionDto.speakingSectionId },
    });

    if (!section) {
      throw new Error('Speaking section not found');
    }

    const question = await this.prisma.speakingQuestion.create({
      data: {
        sectionId: createSpeakingQuestionDto.speakingSectionId,
        order: createSpeakingQuestionDto.order,
        questionText: createSpeakingQuestionDto.questionText,
      },
    });

    return question;
  }

  async findAll(dto: FindAllSpeakingQuestionDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.speakingQuestion.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.speakingQuestion.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const question = await this.prisma.speakingQuestion.findUnique({
      where: { id },
    });

    if (!question) {
      throw new Error('Speaking question not found');
    }

    return question;
  }

  async update(id: string, dto: UpdateSpeakingQuestionDto) {
    const existing = await this.prisma.speakingQuestion.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error('Speaking question not found');
    }

    const updated = await this.prisma.speakingQuestion.update({
      where: { id },
      data: {
        order: dto.order,
        questionText: dto.question,
      },
    });

    return updated;
  }

  async remove(id: string) {
    const existing = await this.prisma.speakingQuestion.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new Error('Speaking question not found');
    }

    await this.prisma.speakingQuestion.delete({
      where: { id },
    });

    return { message: 'Speaking question deleted successfully', id };
  }
}
