import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSectionDto } from './dto/findAll-section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}
  async createSection(dto: CreateSectionDto) {
    const part = await this.prisma.part.findUnique({
      where: { id: dto.partId },
    });
    if (!part) {
      throw HttpError({ message: 'Part not found' });
    }
    return this.prisma.section.create({
      data: {
        title: dto.title,
        content: dto.content,
        imageUrl: dto.imageUrl,
        partId: dto.partId,
      },
    });
  }

  async findAll(dto: FindAllSectionDto) {
    const { limit = 10, page = 1, partId } = dto;
    const part = await this.prisma.part.findUnique({
      where: { id: partId },
    });
    if (!part) {
      throw HttpError({ message: 'Part not found' });
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.section.findMany({
        where: { partId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.section.count(),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  findOne(id: string) {
    const section = this.prisma.section.findUnique({
      where: { id },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.prisma.section.findUnique({
      where: { id },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    const updatedSection = this.prisma.section.update({
      where: { id },
      data: {
        title: updateSectionDto.title ?? section.title,
        content: updateSectionDto.content ?? section.content,
        imageUrl: updateSectionDto.imageUrl ?? section.imageUrl,
      },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    return updatedSection;
  }

  async remove(id: string) {
    const section = await this.prisma.section.findUnique({
      where: { id },
    });
    if (!section) {
      throw HttpError({ message: 'Section not found' });
    }
    return this.prisma.section.delete({ where: { id } });
  }
}
