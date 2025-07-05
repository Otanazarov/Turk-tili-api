import { Injectable } from '@nestjs/common';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto';
import { UpdateSpeakingTestDto } from './dto/update-speaking-test.dto';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSpeakingTestDto } from './dto/findAll-speaking.test.dto';

@Injectable()
export class SpeakingTestService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateSpeakingTestDto) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: dto.ieltsId },
    });
    if (!ielts) {
      throw new HttpError({ message: 'IELTS not found' });
    }

    return this.prisma.speakingTest.create({
      data: {
        title: dto.title,
        ieltsId: dto.ieltsId,
        sections: {
          create: dto.sections.map((section) => {
            const baseSection = {
              order: section.order,
              title: section.title,
              description: section.description,
              images: section.images || [],
              type: section.type,
            };

            if (section.type === 'PART1') {
              return {
                ...baseSection,
                subParts: {
                  create:
                    section.subParts?.map((sub) => ({
                      label: sub.label,
                      description: sub.description,
                      questions: {
                        create: sub.questions.map((q) => ({
                          order: q.order,
                          questionText: q.question,
                        })),
                      },
                    })) || [],
                },
              };
            } else {
              console.log('lll;', dto);
              return {
                ...baseSection,
                questions: {
                  create:
                    section.questions?.map((q) => ({
                      order: q.order,
                      questionText: q.question,
                    })) || [],
                },
              };
            }
          }),
        },
      },
      include: {
        sections: {
          include: {
            subParts: {
              include: {
                questions: true,
              },
            },
            questions: true,
          },
        },
      },
    });
  }

  async findAll(dto: FindAllSpeakingTestDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.speakingTest.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          sections: {
            include: {
              subParts: {
                include: {
                  questions: true,
                },
              },
              questions: true,
            },
          },
          ielts: true,
        },
      }),
      this.prisma.speakingTest.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const speakingTest = await this.prisma.speakingTest.findUnique({
      where: { id },
    });
    if (!speakingTest) {
      throw new HttpError({ message: 'SpeakingTest not found' });
    }
  }

  async remove(id: string) {
    const test = await this.prisma.speakingTest.findUnique({
      where: { id },
    });

    if (!test) {
      throw new HttpError({
        message: 'Speaking test not found',
        statusCode: 404,
      });
    }

    return this.prisma.speakingTest.delete({
      where: { id },
    });
  }
}
