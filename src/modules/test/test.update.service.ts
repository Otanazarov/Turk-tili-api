import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTestDto } from './updateTestsDto/update-test.dto';
import { HttpError } from 'src/common/exception/http.error';
import { UpdateSectionDto } from './updateTestsDto/update-section.dto';
import { UpdateQuestionDto } from './updateTestsDto/update-question.dto';
import { UpdateAnswerDto } from './updateTestsDto/update-answer.dto';
import { UpdatePartDto } from './updateTestsDto/update-part.dto';

@Injectable()
export class TestUpdateService {
  constructor(private readonly prisma: PrismaService) {}
  async updateTest(id: string, dto: UpdateTestDto) {
    const test = await this.prisma.test.findUnique({
      where: { id },
    });
    if (!test) {
      throw HttpError({ message: 'Test not found' });
    }
    const ieltsId = await this.prisma.ielts.findFirst({
      where: { id: dto.ieltsId },
    });
    if (!ieltsId) {
      throw HttpError({ message: 'IELTS ID not found' });
    }
    return this.prisma.test.update({
      where: { id },
      data: dto,
    });
  }

  async updatePart(id: string, dto: UpdatePartDto) {
    const part = await this.prisma.part.findUnique({
      where: { id },
    });
    if (!part) {
      throw HttpError({ message: 'Part not found' });
    }
    return this.prisma.part.update({
      where: { id },
      data: dto,
    });
  }
  async updateSection(id: string, dto: UpdateSectionDto) {
    const section = await this.prisma.section.findUnique({
      where: { id },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    return this.prisma.section.update({
      where: { id },
      data: dto,
    });
  }
  async updateQuestion(id: string, dto: UpdateQuestionDto) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!question) {
      throw HttpError({ message: 'Question not found' });
    }
    return this.prisma.question.update({
      where: { id },
      data: dto,
    });
  }
  async updateAnswer(id: string, dto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    });
    if (!answer) {
      throw HttpError({ message: 'Answer not found' });
    }
    return this.prisma.answer.update({
      where: { id },
      data: dto,
    });
  }
}
