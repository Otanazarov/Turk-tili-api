import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIeltsDto } from './dto/create-ielt.dto';
import { UpdateIeltDto } from './dto/update-ielt.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllIeltsDto } from './dto/findAll-ielts.dto';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class IeltsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIeltsDto: CreateIeltsDto) {
    return this.prisma.ielts.create({
      data: {
        title: createIeltsDto.title,
      },
    });
  }

  async findAll(dto: FindAllIeltsDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.ielts.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          WritingTest: true,
          SpeakingTest: true,
          tests: true,
        },
      }),
      this.prisma.ielts.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id },
      include: {
        tests: true,
      },
    });

    if (!ielts) {
      throw new HttpError({ message: `IELTS with ID ${id} not found` });
    }

    return ielts;
  }

  async update(id: string, updateIeltDto: UpdateIeltDto) {
    try {
      return await this.prisma.ielts.update({
        where: { id },
        data: {
          title: updateIeltDto.title,
        },
      });
    } catch (error) {
      throw new HttpError({ message: `IELTS with ID ${id} not found` });
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.ielts.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpError({ message: `IELTS with ID ${id} not found` });
    }
  }
}
