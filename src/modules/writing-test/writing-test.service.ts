import { HttpError } from "src/common/exception/http.error";
import { CreateWritingTestDto } from "./dto/create-writing-test.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { FindAllWritingTestDto } from "./dto/findAll-writingTest.dto";
import { UpdateWritingTestDto } from "./dto/update-writing-test.dto";

@Injectable()
export class WritingTestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWritingTestDto) {
    const ielts = await this.prisma.ielts.findUnique({
      where: { id: dto.ieltsId },
    });

    if (!ielts) {
      throw new HttpError({ message: 'IELTS not found' });
    }

    return this.prisma.writingTest.create({
      data: {
        title: dto.title,
        instruction: dto.instruction,
        type: 'WRITING',
        ieltsId: dto.ieltsId,
        sections: {
          create: dto.sections.map((section) => ({
            order: section.order,
            title: section.title,
            description: section.description,
            subParts: {
              create: section.subParts?.map((sub) => ({
                order: sub.order,
                label: sub.label,
                question: sub.question,
              })) || [],
            },
          })),
        },
      },
      include: {
        sections: {
          include: {
            subParts: true,
          },
        },
      },
    });
  }

  async findAll(dto: FindAllWritingTestDto) {
    const { limit = 10, page = 1 } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.writingTest.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          sections: {
            include: { subParts: true },
          },
          ielts: true,
        },
      }),
      this.prisma.writingTest.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: string) {
    const test = await this.prisma.writingTest.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            subParts: true,
          },
        },
      },
    });

    if (!test) {
      throw new HttpError({ message: 'Writing test not found' });
    }

    return test;
  }

  async update(id: string, dto: UpdateWritingTestDto) {
    const existing = await this.prisma.writingTest.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new HttpError({ message: 'Writing test not found', statusCode: 404 });
    }

    if (dto.ieltsId) {
      const ielts = await this.prisma.ielts.findUnique({ where: { id: dto.ieltsId } });
      if (!ielts) {
        throw new HttpError({ message: 'IELTS not found', statusCode: 404 });
      }
    }

    return this.prisma.writingTest.update({
      where: { id },
      data: {
        title: dto.title ?? existing.title,
        instruction: dto.instruction ?? existing.instruction,
        ieltsId: dto.ieltsId ?? existing.ieltsId,
      },
    });
  }

  async remove(id: string) {
    const test = await this.prisma.writingTest.findUnique({ where: { id } });

    if (!test) {
      throw new HttpError({ message: 'Writing test not found' });
    }

    return this.prisma.writingTest.delete({ where: { id } });
  }
}
