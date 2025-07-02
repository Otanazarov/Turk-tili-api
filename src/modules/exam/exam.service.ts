import { Injectable } from '@nestjs/common';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { calculateIELTSBand } from 'src/common/utils/ielts-calculator';
import { SubmitAnswersDto } from './dto/submit-test.dto';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}
  async submitAllAnswers(dto: SubmitAnswersDto, userId: string) {
    const test = await this.prisma.test.findUnique({
      where: { id: dto.testId },
    });
    if (!test) {
      throw HttpError({ message: 'Test not found' });
    }

    const testResult = await this.prisma.testResult.create({
      data: {
        userId,
        testId: dto.testId,
        score: 0,
      },
    });

    let correctCount = 0;
    const allUserAnswers: any[] = [];

    for (const answerDto of dto.answers) {
      const question = await this.prisma.question.findUnique({
        where: { id: answerDto.questionId },
        include: { answers: true },
      });

      if (!question) continue;

      const correctAnswers = question.answers
        .filter((a) => a.correct)
        .map((a) => a.answer?.trim().toLowerCase());

      const userAnswerArray = Array.isArray(answerDto.userAnswer)
        ? answerDto.userAnswer.map((a) => a.trim().toLowerCase())
        : [answerDto.userAnswer.trim().toLowerCase()];

      const isCorrect =
        correctAnswers.length === userAnswerArray.length &&
        correctAnswers.every((a) => userAnswerArray.includes(a)) &&
        userAnswerArray.every((a) => correctAnswers.includes(a));
      if (isCorrect) correctCount++;

      allUserAnswers.push({
        resultId: testResult.id,
        questionId: question.id,
        userAnswer: Array.isArray(answerDto.userAnswer)
          ? JSON.stringify(answerDto.userAnswer)
          : answerDto.userAnswer,
        isCorrect,
      });
    }

    await this.prisma.userAnswer.createMany({
      data: allUserAnswers,
    });

    const bandScore = calculateIELTSBand(correctCount);

    await this.prisma.testResult.update({
      where: { id: testResult.id },
      data: {
        score: bandScore,
        completedAt: new Date(),
      },
    });

    return {
      message: 'Test submitted successfully',
      testResultId: testResult.id,
      correctCount,
      totalQuestions: dto.answers.length,
      score: bandScore,
    };
  }

  findAll() {
    return `This action returns all exam`;
  }

  async findUserTestAnswers(testResultId: string) {
    const testResult = await this.prisma.testResult.findMany({
      where: {
        id: testResultId,
      },
      include: {
        userAnswers: {
          include: {
            question: {
              include: {
                answers: true,
              },
            },
          },
        },
      },
    });
    return testResult;
  }

  async findOneUserTestResult(userId: string) {
    const testResult = await this.prisma.testResult.findMany({
      where: {
        userId,
      },
      include: {
        test: true, 
      },
    });

    return testResult;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
