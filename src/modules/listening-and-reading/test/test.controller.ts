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
import { FindAllTestDto } from './dto/findAll-test.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateAllTestDto } from './dto/create-AllTest.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update.test.dto';

@Controller('test')
@ApiTags('Reading Or Listening Test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('')
  @DecoratorWrapper('createTestWithAddition', true, [Role.ADMIN])
  create(@Body() createTestDto: CreateAllTestDto) {
    return this.testService.createTestWithAddition(createTestDto);
  }

  @Post('only')
  @DecoratorWrapper('createOnlyTest', true, [Role.ADMIN])
  createOnlyTest(@Body() dto: CreateTestDto) {
    return this.testService.createTest(dto);
  }

  @Get('/:id')
  @DecoratorWrapper('findOneTestWithAddition')
  findOneTestWithAddition(@Param('id') id: string) {
    return this.testService.findOneTestWithAddition(id);
  }

  @Get('only/:id')
  @DecoratorWrapper('findOneOnlyTest')
  findOneOnlyTest(@Param('id') id: string) {
    return this.testService.findOneOnlyTest(id);
  }

  @Get('')
  @DecoratorWrapper('findAllWithAddition')
  findAllWithAddition(@Query() dto: FindAllTestDto) {
    return this.testService.findAll(dto);
  }

  @Get('only')
  @DecoratorWrapper('findAllOnlyTest')
  findAllOnly(@Query() dto: FindAllTestDto) {
    return this.testService.findAllOnlyTest(dto);
  }

  @Patch('only/:id')
  @DecoratorWrapper('updateOnlyTest')
  updateOnlyTest(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.testService.updateOnlyTest(id, dto);
  }

  // @Post()
  // @DecoratorWrapper('createTest', true, [Role.ADMIN])
  // createTest(@Body() dto: CreateTestDto) {
  //   return this.testCreateService.createTest(dto);
  // }

  @Delete(':id')
  @DecoratorWrapper('removeTest')
  removeTest(@Param('id') id: string) {
    return this.testService.removeTest(id);
  }

  @Delete('only/:id')
  @DecoratorWrapper('removeOnlyTest')
  remove(@Param('id') id: string) {
    return this.testService.removeOnlyTest(id);
  }
}
