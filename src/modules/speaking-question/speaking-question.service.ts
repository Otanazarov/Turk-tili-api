import { Injectable } from '@nestjs/common';
import { CreateSpeakingQuestionDto } from './dto/create-speaking-question.dto';
import { UpdateSpeakingQuestionDto } from './dto/update-speaking-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSpeakingQuestionDto } from './dto/findAll-speaking-question.dto';
import { CreateSubPartSpeakingQuestionDto } from './dto/create-sub-part-question.dto';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class SpeakingQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSectionQuestion(
    createSpeakingQuestionDto: CreateSpeakingQuestionDto,
  ) {
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
  async createForSubPart(dto: CreateSubPartSpeakingQuestionDto) {
    const { speakingSubPartId, order, questionText } = dto;

    const subPart = await this.prisma.speakingSubPart.findUnique({
      where: { id: speakingSubPartId },
    });

    if (!subPart) {
      throw new HttpError({ message: 'Speaking SubPart topilmadi' });
    }

    const newQuestion = await this.prisma.speakingQuestion.create({
      data: {
        subPartId: speakingSubPartId,
        order,
        questionText: questionText,
      },
    });

    return newQuestion;
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
        questionText: dto.questionText,
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
