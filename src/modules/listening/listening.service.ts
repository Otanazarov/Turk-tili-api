import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllListeningQueryDto } from './dto/findAll-listening-test.dto';
import { UpdateListeningDto } from './dto/update-listening-test.dto';
import { CreateListeningTestDto } from './dto/create-listening-test.dto';

@Injectable()
export class ListeningService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createListeningDto: CreateListeningTestDto) {
    const listening = await this.prisma.listeningTest.create({
      include: {
        passages: {
          include: {
            sections: {
              include: { questions: { include: { answers: true } } },
            },
          },
        },
      },
      data: {
        title: createListeningDto.title,
        description: createListeningDto.description,
        passages: {
          create: createListeningDto.passages.map((passage) => ({
            title: passage.title,
            order: passage.order,
            sections: {
              create: passage.sections.map((section) => ({
                title: section.title,
                audioUrl: section.audioUrl,
                order: section.order,
                questions: {
                  create: section.questions.map((question) => ({
                    questionText: question.questionText,
                    order: question.order,
                    questionType: question.questionType,
                    answers: {
                      create: question.answers.map((answer) => ({
                        answerText: answer.answerText,
                        isCorrect: answer.isCorrect,
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
    return listening;
  }

  async findAll(dto: FindAllListeningQueryDto) {
    const { limit = 10, page = 1, title } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.listeningTest.findMany({
        where: {
          title: {
            contains: title?.trim() || '',
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.listeningTest.count({
        where: {
          title: {
            contains: title?.trim() || '',
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const listening = await this.prisma.listeningTest.findUnique({
      where: { id },
      include: {
        passages: {
          include: {
            sections: {
              include: { questions: { include: { answers: true } } },
            },
          },
        },
      },
    });
    if (!listening) {
      throw HttpError({ code: 'Listening not found' });
    }
    return listening;
  }

  async update(id: string, dto: UpdateListeningDto) {
    const listening = await this.prisma.listeningTest.findUnique({
      where: { id: id },
    });
    if (!listening) throw HttpError({ code: 'Listening not found' });

    const updateData: any = {
      title: dto.title || listening.title,
    };

    const updatedListening = await this.prisma.listeningTest.update({
      where: { id },
      data: updateData,
    });

    return updatedListening;
  }

  async remove(id: string) {
    const listening = await this.prisma.listeningTest.findUnique({
      where: { id },
    });
    if (!listening) {
      throw HttpError({ code: 'Listening not found' });
    }
    return await this.prisma.listeningTest.delete({
      where: { id },
    });
  }
}
