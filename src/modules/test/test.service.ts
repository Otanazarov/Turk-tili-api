import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTestDto } from './dto/findAll-test.dto';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}
  async createTestWithParts(dto: CreateTestDto) {
    return this.prisma.test.create({
      data: {
        title: dto.title,
        type: dto.type,
        ieltsId: dto.ieltsId,
        parts: {
          create: dto.parts.map((part) => ({
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
    });
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

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
