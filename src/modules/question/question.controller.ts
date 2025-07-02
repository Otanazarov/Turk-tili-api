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
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { FindAllquestionDto } from './dto/findAll-question.dto';
import { UUID } from 'crypto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @DecoratorWrapper('createQuestion', true, [Role.ADMIN])
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get()
  @DecoratorWrapper('findAllQuestion')
  findAll(@Query() dto: FindAllquestionDto) {
    return this.questionService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneQuestion')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateQuestion', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeQuestion', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
