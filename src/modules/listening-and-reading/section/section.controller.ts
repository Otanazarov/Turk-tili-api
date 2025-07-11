import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { FindAllSectionDto } from './dto/findAll-section.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('section')
@ApiTags('Reading Or Listening Section for')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  @DecoratorWrapper('createSection', true, [Role.ADMIN])
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.createSection(createSectionDto);
  }

  @Get()
  @DecoratorWrapper('findAllSection',)
  findAll(@Query() dto: FindAllSectionDto) {
    return this.sectionService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneSection')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateSection', true, [Role.ADMIN])
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeSection', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
