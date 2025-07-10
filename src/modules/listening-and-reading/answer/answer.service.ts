import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllAnswerDto } from './dto/findAll-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}
  async createAnswer(dto: CreateAnswerDto) {
    const question = await this.prisma.question.findUnique({
      where: { id: dto.questionId },
    });
    if (!question) {
      throw HttpError({ message: 'Question not found' });
    }
    return this.prisma.answer.create({
      data: {
        answer: dto.answer,
        correct: dto.correct,
        variantText: dto.variantText,
        questionId: dto.questionId,
      },
    });
  }

  async findAll(dto: FindAllAnswerDto) {
    const { limit = 10, page = 1, questionId } = dto;
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      throw HttpError({ message: 'Question not found' });
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.answer.findMany({
        where: { questionId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.answer.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    });
    if (!answer) {
      throw new HttpError({ message: 'Answer not found' });
    }
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    });
    if (!answer) {
      throw new HttpError({ message: 'Answer not found' });
    }
    return this.prisma.answer.update({
      where: { id },
      data: {
        answer: updateAnswerDto.answer ?? answer.answer,
        correct: updateAnswerDto.correct ?? answer.correct,
        variantText: updateAnswerDto.variantText ?? answer.variantText,
      },
    });
  }

  async remove(id: string) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    });
    if (!answer) {
      throw new HttpError({ message: 'Answer not found' });
    }
    const answerDelete = await this.prisma.answer.delete({
      where: { id },
    });
    return answerDelete;
  }
}
