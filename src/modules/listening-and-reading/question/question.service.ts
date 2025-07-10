import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllquestionDto } from './dto/findAll-question.dto';
import { UUID } from 'crypto';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}
  async createQuestion(dto: CreateQuestionDto) {
    const section = await this.prisma.section.findUnique({
      where: { id: dto.sectionId },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    return this.prisma.question.create({
      data: {
        number: dto.number,
        text: dto.text,
        type: dto.type,
        sectionId: dto.sectionId,
      },
    });
  }

  async findAll(dto: FindAllquestionDto) {
    const { limit = 10, page = 1, sectionId } = dto;
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.question.findMany({
        where: { sectionId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!question) {
      throw HttpError({ message: 'Question not found' });
    }
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!question) {
      throw HttpError({ message: 'Question not found' });
    }
    return this.prisma.question.update({
      where: { id },
      data: {
        number: updateQuestionDto.number ?? question.number,
        text: updateQuestionDto.text ?? question.text,
        type: updateQuestionDto.type ?? question.type,
      },
    });
  }

  async remove(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!question) {
      throw HttpError({ message: 'Question not found' });
    }
    return this.prisma.question.delete({ where: { id } });
  }
}
