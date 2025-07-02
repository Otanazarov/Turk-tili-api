import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTestDto } from './dto/findAll-test.dto';
import { HttpError } from 'src/common/exception/http.error';
import { CreateAllTestDto } from './dto/create-AllTest.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update.test.dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}
  async createTestWithAddition(dto: CreateAllTestDto) {
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

  async createTest(dto: CreateTestDto) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: dto.ieltsId },
    });
    if (!ielts) {
      throw HttpError({ message: 'IELTS not found' });
    }
    return this.prisma.test.create({
      data: {
        title: dto.title || null,
        type: dto.type,
        description: dto.description || null,
        ieltsId: dto.ieltsId,
      },
    });
  }

  async findOneTestWithAddition(id: string) {
    const test = await this.prisma.test.findUnique({
      where: { id },
    });
    if (!test) {
      throw HttpError({ message: 'Test not found' });
    }
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

  async findOneOnlyTest(id: string) {
    const test = await this.prisma.test.findUnique({
      where: { id },
    });

    if (!test) {
      throw HttpError({ message: 'Test not found' });
    }
    return test;
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

  async findAllOnlyTest(dto: FindAllTestDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.test.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
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

  async updateOnlyTest(id: string, dto: UpdateTestDto) {
    const test = await this.prisma.test.findUnique({
      where: { id },
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
        title: dto.title || test.title,
        type: dto.type || test.type,
        description: dto.description || test.description,
        ieltsId: dto.ieltsId || test.ieltsId,
      },
    });
  }

  removeOnlyTest(id: string) {
    return this.prisma.test.delete({
      where: { id },
    });
  }
}
