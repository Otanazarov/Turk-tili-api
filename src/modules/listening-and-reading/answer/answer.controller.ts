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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { FindAllAnswerDto } from './dto/findAll-answer.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('answer')
@ApiTags('Reading Or Listening Answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @DecoratorWrapper('createAnswer', true, [Role.ADMIN])
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createAnswer(createAnswerDto);
  }

  @Get()
  @DecoratorWrapper('findAllAnswer', true, [Role.ADMIN])
  findAll(@Query() dto: FindAllAnswerDto) {
    return this.answerService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneAnswer')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateAnswer', true, [Role.ADMIN])
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeAnswer', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.answerService.remove(id);
  }
}
