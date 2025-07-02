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
@ApiTags('Test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('with')
  @DecoratorWrapper('createTestWithAddition', true, [Role.ADMIN])
  create(@Body() createTestDto: CreateAllTestDto) {
    return this.testService.createTestWithAddition(createTestDto);
  }

  @Post('only')
  @DecoratorWrapper('createOnlyTest', true, [Role.ADMIN])
  createOnlyTest(@Body() dto: CreateTestDto) {
    return this.testService.createTest(dto);
  }

  @Get('with/:id')
  @DecoratorWrapper('findOneTestWithAddition')
  findOneTestWithAddition(@Param('id') id: string) {
    return this.testService.findOneTestWithAddition(id);
  }

  @Get('only/:id')
  @DecoratorWrapper('findOneOnlyTest')
  findOneOnlyTest(@Param('id') id: string) {
    return this.testService.findOneOnlyTest(id);
  }

  @Get('with')
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

  @Delete('only/:id')
  @DecoratorWrapper('removeOnlyTest')
  removeOnlyTest(@Param('id') id: string) {
    return this.testService.removeOnlyTest(id);
  }

  // @Post()
  // @DecoratorWrapper('createTest', true, [Role.ADMIN])
  // createTest(@Body() dto: CreateTestDto) {
  //   return this.testCreateService.createTest(dto);
  // }

  @Get()
  @DecoratorWrapper('findAllTest')
  findAll(@Query() dto: FindAllTestDto) {
    return this.testService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneTest')
  findOne(@Param('id') id: string) {
    return this.testService.findOneOnlyTest(id);
  }

  @Delete(':id')
  @DecoratorWrapper('removeOnlyTest')
  remove(@Param('id') id: string) {
    return this.testService.removeOnlyTest(id);
  }
}
