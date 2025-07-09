import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WritingSubPartService } from './writing-sub-part.service';
import { CreateOnlyWritingSubPartDto } from './dto/create-writing-sub-part.dto';
import { UpdateWritingSubPartDto } from './dto/update-writing-sub-part.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('writing-sub-part')
export class WritingSubPartController {
  constructor(private readonly writingSubPartService: WritingSubPartService) {}

  @Post()
  @DecoratorWrapper('createWritingSubPart', true, [Role.ADMIN])
  create(@Body() createWritingSubPartDto: CreateOnlyWritingSubPartDto) {
    return this.writingSubPartService.create(createWritingSubPartDto);
  }

  @Get()
  @DecoratorWrapper('findAllWritingSubPart')
  findAll() {
    return this.writingSubPartService.findAll();
  }

  @Get(':id')
  @DecoratorWrapper('findOneWritingSubPart')
  findOne(@Param('id') id: string) {
    return this.writingSubPartService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateWritingSubPart', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateWritingSubPartDto: UpdateWritingSubPartDto,
  ) {
    return this.writingSubPartService.update(id, updateWritingSubPartDto);
  }

  @Delete(':id')
  @DecoratorWrapper('deleteWritingSubPart', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.writingSubPartService.remove(id);
  }
}
