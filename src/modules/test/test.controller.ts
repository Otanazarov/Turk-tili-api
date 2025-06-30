import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { FindAllTestDto } from './dto/findAll-test.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Request } from 'express';
import { Role } from '@prisma/client';
import { SubmitAnswersDto } from '../exam/dto/submit-test.dto';
import { TestUpdateService } from './test.update.service';
import { UpdateTestDto } from './updateTestsDto/update-test.dto';
import { UpdatePartDto } from './updateTestsDto/update-part.dto';
import { UpdateSectionDto } from './updateTestsDto/update-section.dto';
import { UpdateQuestionDto } from './updateTestsDto/update-question.dto';
import { UpdateAnswerDto } from './updateTestsDto/update-answer.dto';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly testUpdateService: TestUpdateService,
  ) {}

  @Post()
  @DecoratorWrapper('createTest')
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.createTestWithParts(createTestDto);
  }

  // @Get('result/:testId')
  // @DecoratorWrapper('getTestResult', true, [Role.USER])
  // async getTestResult(@Param('testId') testId: string, @Req() req: Request) {
  //   const user = req.user as any; // JWT bilan kelgan user
  //   return this.testService.findOneTestResult(user.id, testId);
  // }

  @Get()
  @DecoratorWrapper('findAllTest')
  findAll(@Query() dto: FindAllTestDto) {
    return this.testService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneTest')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }

@Patch('test/:id')
@DecoratorWrapper('updateTest')
updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto) {
  return this.testUpdateService.updateTest(id, dto);
}

@Patch('part/:id')
@DecoratorWrapper('updatePart')
updatePart(@Param('id') id: string, @Body() dto: UpdatePartDto) {
  return this.testUpdateService.updatePart(id, dto);
}

@Patch('section/:id')
@DecoratorWrapper('updateSection')
updateSection(@Param('id') id: string, @Body() dto: UpdateSectionDto) {
  return this.testUpdateService.updateSection(id, dto);
}

@Patch('question/:id')
@DecoratorWrapper('updateQuestion')
updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
  return this.testUpdateService.updateQuestion(id, dto);
}

@Patch('answer/:id')
@DecoratorWrapper('updateAnswer')
updateAnswer(@Param('id') id: string, @Body() dto: UpdateAnswerDto) {
  return this.testUpdateService.updateAnswer(id, dto);
}

@Delete(':id')
@DecoratorWrapper('removeTest')
remove(@Param('id') id: string) {
  return this.testService.remove(+id);
}

}
