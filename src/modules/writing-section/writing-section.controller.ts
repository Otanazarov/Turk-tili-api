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
import { WritingSectionService } from './writing-section.service';
import { CreateOnlyWritingSectionDto } from './dto/create-writing-section.dto';
import { UpdateWritingSectionDto } from './dto/update-writing-section.dto';
import { FindAllOnlyWritingSectionDto } from './dto/findAll-writing-section.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('writing-section')
export class WritingSectionController {
  constructor(private readonly writingSectionService: WritingSectionService) {}

  @Post()
  @DecoratorWrapper('createWritingSection', true, [Role.ADMIN])
  create(@Body() createWritingSectionDto: CreateOnlyWritingSectionDto) {
    return this.writingSectionService.create(createWritingSectionDto);
  }

  @Get()
  @DecoratorWrapper('findAllWritingSection')
  findAll(@Query() dto: FindAllOnlyWritingSectionDto) {
    return this.writingSectionService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneWritingSection')
  findOne(@Param('id') id: string) {
    return this.writingSectionService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateWritingSection', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateWritingSectionDto: UpdateWritingSectionDto,
  ) {
    return this.writingSectionService.update(id, updateWritingSectionDto);
  }

  @Delete(':id')
  @DecoratorWrapper('deleteWritingSection', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.writingSectionService.remove(id);
  }
}
