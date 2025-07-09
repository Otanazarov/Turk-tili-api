import { Injectable } from '@nestjs/common';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto';
import { updateOnlySpeakingTestDto } from './dto/update-speaking-test.dto';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSpeakingTestDto } from './dto/findAll-speaking.test.dto';
import { createOnlySpeakingTestDto } from './dto/create-only-speaking-test.dto';
import { OpenAIService } from '../openAI/openAI.service';

@Injectable()
export class SpeakingTestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly openAIService: OpenAIService,
  ) {}

  async convertAudioToText(audioBuffer: Buffer) {
    return this.openAIService.speechToText(audioBuffer);
  }

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
        type: 'SPEAKING',
        sections: {
          create: dto.sections.map((section) => ({
            order: section.order,
            title: section.title,
            description: section.description,
            images: section.images || [],
            type: section.type,
            content: section.content || null,
            points: {
              create: section.points || [],
            },
            subParts: section.subParts
              ? {
                  create: section.subParts.map((sub) => ({
                    label: sub.label,
                    description: sub.description,
                    questions: {
                      create: sub.questions.map((q) => ({
                        order: q.order,
                        questionText: q.question,
                      })),
                    },
                  })),
                }
              : undefined,
            questions: section.questions
              ? {
                  create: section.questions.map((q) => ({
                    order: q.order,
                    questionText: q.question,
                  })),
                }
              : undefined,
          })),
        },
      },
      include: {
        sections: {
          include: {
            points: true,
            subParts: { include: { questions: true } },
            questions: true,
          },
        },
      },
    });
  }

  async createOnlySpeakingTest(dto: createOnlySpeakingTestDto) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: dto.ieltsId },
    });
    if (!ielts) {
      throw new HttpError({ message: 'Ielts not found' });
    }
    const speakingTest = await this.prisma.speakingTest.create({
      data: {
        title: dto.title,
        ieltsId: dto.ieltsId,
        type: 'SPEAKING',
      },
    });

    return speakingTest;
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

  async findAllOnlySpeakingTest(dto: FindAllSpeakingTestDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.speakingTest.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
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

  async findOneOnlySpeakingTest(id: string) {
    const speakingTest = await this.prisma.speakingTest.findUnique({
      where: { id },
    });
    if (!speakingTest) {
      throw new HttpError({ message: 'SpeakingTest not found' });
    }
    return speakingTest;
  }

  async findOne(id: string) {
    const speakingTest = await this.prisma.speakingTest.findUnique({
      where: { id },
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
    if (!speakingTest) {
      throw new HttpError({ message: 'SpeakingTest not found' });
    }
    return speakingTest;
  }

  async update(id: string, dto: updateOnlySpeakingTestDto) {
    const speakingTest = await this.prisma.speakingTest.findUnique({
      where: { id },
    });
    if (!speakingTest) {
      throw new HttpError({ message: 'SpeakingTest not found' });
    }
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: dto.ieltsId },
    });
    if (!ielts) {
      throw new HttpError({ message: 'Ielts not found' });
    }
    return this.prisma.speakingTest.update({
      where: { id },
      data: {
        title: dto.title ?? speakingTest.title,
        ieltsId: dto.ieltsId ?? speakingTest.ieltsId,
      },
    });
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
