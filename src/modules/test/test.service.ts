import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTestDto } from './dto/findAll-test.dto';
import { HttpError } from 'src/common/exception/http.error';

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
        description: dto.description || null,
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
  
  // async findOneTestResult(userId: string, testId: string) {
  //   const testResult = await this.prisma.testResult.findFirst({
  //     where: {
  //       userId,
  //       testId,
  //     },
  //     include: {
  //       userAnswers: {
  //         include: {
  //           question: {
  //             include: {
  //               answers: true, // to‘g‘ri javoblarni olish uchun
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   if (!testResult) {
  //     throw new HttpError({ message: 'Natija topilmadi' });
  //   }

  //   // Javoblarni formatlab beramiz
  //   // const details = testResult.userAnswers.map((ua) => {
  //   //   const correctAnswers = ua.question.answers
  //   //     .filter((a) => a.correct)
  //   //     .map((a) => a.answer?.trim());

  //   //   return {
  //   //     questionId: ua.questionId,
  //   //     questionText: ua.question.text,
  //   //     userAnswer: ua.userAnswer,
  //   //     correctAnswers,
  //   //     isCorrect: ua.isCorrect,
  //   //   };
  //   // });

  //   // return {
  //   //   score: testResult.score,
  //   //   completedAt: testResult.completedAt,
  //   //   totalQuestions: testResult.userAnswers.length,
  //   //   correctCount: details.filter((d) => d.isCorrect).length,
  //   //   answers: details,
  //   // };
  // }

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

  // async update(id: string, dto: UpdateTestDto) {
  //   const test = await this.prisma.test.findUnique({
  //     where: { id },
  //     include: {
  //       parts: {
  //         include: {
  //           sections: {
  //             include: { questions: { include: { answers: true } } },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   if (!test) {
  //     throw HttpError({ message: 'Test not found' });
  //   }

  //   if (dto.ieltsId) {
  //     const ielts = await this.prisma.ielts.findUnique({
  //       where: { id: dto.ieltsId },
  //     }); 
  //     if (!ielts) {
  //       throw HttpError({ message: 'IELTS not found' });
  //     }
  //   }

  //   return this.prisma.test.update({
  //     where: { id },
  //     data: {
  //       title: dto.title,
  //       type: dto.type,
  //       ieltsId: dto.ieltsId,
  //       parts: {
  //         deleteMany: {},
  //         create: dto.parts?.map((part) => ({
  //           number: part.number,
  //           audioUrl: part.audioUrl || null,
  //           sections: {
  //             create: part.sections.map((section) => ({
  //               title: section.title,
  //               content: section.content,
  //               hasBullets: false,
  //               questions: {
  //                 create: section.questions.map((q) => ({
  //                   number: q.number,
  //                   type: q.type,
  //                   text: q.text,
  //                   answers: {
  //                     create: q.answers.map((a) => ({
  //                       answer: a.answer,
  //                       correct: a.correct,
  //                     })),
  //                   },
  //                 })),
  //               },
  //             })),
  //           },
  //         })),
  //       },
  //     },
  //     include: {
  //       parts: {
  //         include: {
  //           sections: {
  //             include: {
  //               questions: {
  //                 include: {
  //                   answers: true,
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
