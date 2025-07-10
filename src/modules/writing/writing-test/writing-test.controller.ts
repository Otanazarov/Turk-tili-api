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
import { WritingTestService } from './writing-test.service';
import { CreateWritingTestDto } from './dto/create-writing-test.dto';
import { UpdateWritingTestDto } from './dto/update-writing-test.dto';
import { FindAllWritingTestDto } from './dto/findAll-writingTest.dto';
import { ApiTags } from '@nestjs/swagger';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('writing-test')
@ApiTags('WritingTest')
export class WritingTestController {
  constructor(private readonly writingTestService: WritingTestService) {}

  @Post()
  @DecoratorWrapper('createWritingTest', true, [Role.ADMIN])
  create(@Body() createWritingTestDto: CreateWritingTestDto) {
    return this.writingTestService.create(createWritingTestDto);
  }

  @Get()
  findAll(@Query() dto: FindAllWritingTestDto) {
    return this.writingTestService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writingTestService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateWritingTest', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateWritingTestDto: UpdateWritingTestDto,
  ) {
    return this.writingTestService.update(id, updateWritingTestDto);
  }

  @Delete(':id')
  @DecoratorWrapper('reomveWritingTest', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.writingTestService.remove(id);
  }
}
