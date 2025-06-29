import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTestDto } from './dto/findAll-test.dto';
import { HttpError } from 'src/common/exception/http.error';
import { SubmitAnswerDto, SubmitAnswersDto } from './dto/submit-test.dto';
import { QuestionType } from '@prisma/client';
import { calculateIELTSBand } from 'src/common/utils/ielts-calculator';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}
  async createTestWithParts(dto: CreateTestDto) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: dto.ieltsId },
    });
    if (!ielts) {
      throw HttpError({ message: 'IELTS not found' });
    }

    return this.prisma.test.create({
      data: {
        title: dto.title,
        type: dto.type,
        ieltsId: dto.ieltsId,
        parts: {
          create: dto.parts.map((part) => ({
            number: part.number,
            audioUrl: part.audioUrl || null,
            title: part.title || null,
            sections: {
              create: part.sections.map((section) => ({
                imageUrl: section.imageUrl || null,
                title: section.title,
                content: section.content,
                hasBullets: false,
                questions: {
                  create: section.questions.map((q) => ({
                    number: q.number,
                    type: q.type,
                    text: q.text,
                    answers: {
                      create: q.answers.map((a) => ({
                        answer: a.answer,
                        correct: a.correct,
                        variantText: a.variantText || null,
                      })),
                    },
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        parts: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    answers: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async submitAllAnswers(dto: SubmitAnswersDto, userId: string) {
    // 1. Test ID ni olish (birinchi savol orqali)
    const firstQuestion = await this.prisma.question.findUnique({
      where: { id: dto.answers[0].questionId },
      include: { section: { include: { part: true } } },
    });
    console.log('First Question:', firstQuestion);
    

    if (!firstQuestion) {
      throw new HttpError({ message: 'questions not found' });
    }

    const testId = firstQuestion.section.part.testId;

    // 2. Test natijasini yaratish
    const testResult = await this.prisma.testResult.create({
      data: {
        userId,
        testId,
        score: 0, // vaqtincha
      },
    });

    let correctCount = 0;
    const allUserAnswers: any[] = [];

    // 3. Har bir javobni tekshiramiz
    for (const answerDto of dto.answers) {
      const question = await this.prisma.question.findUnique({
        where: { id: answerDto.questionId },
        include: { answers: true },
      });

      if (!question) continue;

      // To‘g‘ri javoblarni olish
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

      // UserAnswer saqlash uchun tayyorlash
      allUserAnswers.push({
        resultId: testResult.id,
        questionId: question.id,
        userAnswer: Array.isArray(answerDto.userAnswer)
          ? JSON.stringify(answerDto.userAnswer)
          : answerDto.userAnswer,
        isCorrect,
      });
    }

    // 4. Hammasini birdan saqlash (bulk create)
    await this.prisma.userAnswer.createMany({
      data: allUserAnswers,
    });

    // 5. Yakuniy score hisoblash (foiz shaklida)
    const score = Math.round((correctCount / dto.answers.length) * 100);

    const bandScore = calculateIELTSBand(correctCount);

    // 6. TestResult ni update qilish
    await this.prisma.testResult.update({
      where: { id: testResult.id },
      data: {
        score: bandScore,
        completedAt: new Date(),
      },
    });

    return {
      message: 'Test yakunlandi',
      testResultId: testResult.id,
      correctCount,
      totalQuestions: dto.answers.length,
      score: bandScore,
    };
  }

  async findAll(dto: FindAllTestDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.test.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          parts: {
            include: {
              sections: {
                include: {
                  questions: {
                    include: {
                      answers: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
      this.prisma.test.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    return this.prisma.test.findUnique({
      where: { id },
      include: {
        parts: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    answers: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, dto: UpdateTestDto) {
    const test = await this.prisma.test.findUnique({
      where: { id },
      include: {
        parts: {
          include: {
            sections: {
              include: { questions: { include: { answers: true } } },
            },
          },
        },
      },
    });

    if (!test) {
      throw HttpError({ message: 'Test not found' });
    }

    if (dto.ieltsId) {
      const ielts = await this.prisma.ielts.findUnique({
        where: { id: dto.ieltsId },
      });
      if (!ielts) {
        throw HttpError({ message: 'IELTS not found' });
      }
    }

    return this.prisma.test.update({
      where: { id },
      data: {
        title: dto.title,
        type: dto.type,
        ieltsId: dto.ieltsId,
        parts: {
          deleteMany: {},
          create: dto.parts?.map((part) => ({
            number: part.number,
            audioUrl: part.audioUrl || null,
            sections: {
              create: part.sections.map((section) => ({
                title: section.title,
                content: section.content,
                hasBullets: false,
                questions: {
                  create: section.questions.map((q) => ({
                    number: q.number,
                    type: q.type,
                    text: q.text,
                    answers: {
                      create: q.answers.map((a) => ({
                        answer: a.answer,
                        correct: a.correct,
                      })),
                    },
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        parts: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    answers: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
