import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { CreateOnlyWritingSubPartDto } from './dto/create-writing-sub-part.dto';
import { UpdateWritingSubPartDto } from './dto/update-writing-sub-part.dto';

@Injectable()
export class WritingSubPartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOnlyWritingSubPartDto) {
    const section = await this.prisma.writingSection.findUnique({
      where: { id: dto.sectionId },
    });

    if (!section) {
      throw new HttpError({ message: 'Writing section not found' });
    }

    return this.prisma.writingSubPart.create({
      data: {
        order: dto.order,
        label: dto.label,
        question: dto.question,
        sectionId: dto.sectionId,
      },
    });
  }

  async findAll() {
    return this.prisma.writingSubPart.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        section: true, // istasangiz sectionni ham qo‘shib ko‘rish mumkin
      },
    });
  }

  async findOne(id: string) {
    const subPart = await this.prisma.writingSubPart.findUnique({
      where: { id },
      include: { section: true },
    });

    if (!subPart) {
      throw new HttpError({ message: 'Writing subPart not found' });
    }

    return subPart;
  }

  async update(id: string, dto: UpdateWritingSubPartDto) {
    const subPart = await this.prisma.writingSubPart.findUnique({
      where: { id },
    });

    if (!subPart) {
      throw new HttpError({ message: 'Writing subPart not found' });
    }

    return this.prisma.writingSubPart.update({
      where: { id },
      data: {
        order: dto.order ?? subPart.order,
        label: dto.label ?? subPart.label,
        question: dto.question ?? subPart.question,
      },
    });
  }

  async remove(id: string) {
    const subPart = await this.prisma.writingSubPart.findUnique({
      where: { id },
    });

    if (!subPart) {
      throw new HttpError({ message: 'Writing subPart not found' });
    }

    return this.prisma.writingSubPart.delete({
      where: { id },
    });
  }
}
