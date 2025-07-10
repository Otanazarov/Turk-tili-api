import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { UpdateExamDto } from './dto/update-exam.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { Request } from 'express';
import { SubmitAnswersDto } from './dto/submit-test.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserAnswerDto } from './dto/user-answer.dto';

@Controller('exam')
@ApiTags('Reading Or Listening Exam yani Test topshirishi')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('submit-all')
  @DecoratorWrapper('submitAllTest', true, [Role.USER])
  submitAll(@Body() dto: SubmitAnswersDto, @Req() req: Request) {
    return this.examService.submitAllAnswers(dto, req.user.id);
  }

  @Get()
  @Get('all-results')
  @DecoratorWrapper('getAllTestResults', true, [Role.ADMIN])
  async getAllTest() {
    return this.examService.findAllTestResults();
  }

  @Get('user-answers')
  @DecoratorWrapper('getAllUserAnswers')
  async getAllUserAnswers(@Query() dto: UserAnswerDto) {
    return this.examService.findUserTestAnswers(dto.testResulId);
  }

  @Get('result')
  @DecoratorWrapper('getOneUserTestResults', true, [Role.USER])
  async getAllTestResults(@Req() req: Request) {
    return this.examService.findOneUserTestResult(req.user.id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
  //   return this.examService.update(+id, updateExamDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.examService.remove(+id);
  // }
}
