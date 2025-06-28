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
import { UpdateTestDto } from './dto/update-test.dto';
import { FindAllTestDto } from './dto/findAll-test.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { SubmitAnswersDto } from './dto/submit-test.dto';
import { Request } from 'express';
import { Role } from '@prisma/client';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @DecoratorWrapper('createTest')
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.createTestWithParts(createTestDto);
  }

  @Post('submit-all')
  @DecoratorWrapper('submitAllTest', true, [Role.USER])
  submitAll(@Body() dto: SubmitAnswersDto, @Req() req: Request) {
    return this.testService.submitAllAnswers(dto, req.user.id);
  }

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

  @Patch(':id')
  @DecoratorWrapper('updateTest')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeTest')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
