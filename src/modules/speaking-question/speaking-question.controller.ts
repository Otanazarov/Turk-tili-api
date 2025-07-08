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
import { SpeakingQuestionService } from './speaking-question.service';
import { CreateSpeakingQuestionDto } from './dto/create-speaking-question.dto';
import { UpdateSpeakingQuestionDto } from './dto/update-speaking-question.dto';
import { FindAllSpeakingQuestionDto } from './dto/findAll-speaking-question.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('speaking-question')
export class SpeakingQuestionController {
  constructor(
    private readonly speakingQuestionService: SpeakingQuestionService,
  ) {}

  @Post()
  @DecoratorWrapper('createSpeakingQuestion', true, [Role.ADMIN])
  create(@Body() createSpeakingQuestionDto: CreateSpeakingQuestionDto) {
    return this.speakingQuestionService.create(createSpeakingQuestionDto);
  }

  @Get()
  @DecoratorWrapper('findAllSpeakingQuestion')
  findAll(@Query() dto: FindAllSpeakingQuestionDto) {
    return this.speakingQuestionService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneSpeakingQuestion')
  findOne(@Param('id') id: string) {
    return this.speakingQuestionService.findOne(id);
  }

  @Patch(':id') 
  @DecoratorWrapper('updateSpeakingQuestion', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateSpeakingQuestionDto: UpdateSpeakingQuestionDto,
  ) {
    return this.speakingQuestionService.update(id, updateSpeakingQuestionDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeSpeakingQuestion', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingQuestionService.remove(id);
  }
}
