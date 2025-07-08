import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SpeakingTestService } from './speaking-test.service';
import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto';
import { Role } from '@prisma/client';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { FindAllSpeakingTestDto } from './dto/findAll-speaking.test.dto';
import { createOnlySpeakingTestDto } from './dto/create-only-speaking-test.dto';

@ApiTags('Speaking Test')
@Controller('speaking-test')
export class SpeakingTestController {
  constructor(private readonly speakingTestService: SpeakingTestService) {}

  @Post()
  @DecoratorWrapper('CreateSpeakingTest', true, [Role.ADMIN])
  create(@Body() createSpeakingTestDto: CreateSpeakingTestDto) {
    return this.speakingTestService.create(createSpeakingTestDto);
  }

  @Post('only')
  @DecoratorWrapper('CreateOnlySpeakingTest', true, [Role.ADMIN])
  createOnlySpeakingTest(@Body() dto: createOnlySpeakingTestDto) {
    return this.speakingTestService.createOnlySpeakingTest(dto);
  }

  @Get()
  @DecoratorWrapper('FindAllSpeakingTest')
  findAll(@Query() dto: FindAllSpeakingTestDto) {
    return this.speakingTestService.findAll(dto);
  }

  @Get('only')
  @DecoratorWrapper('FindAllOnlySpeakingTest')
  async findAllOnlySpeakingTest(@Query() dto: FindAllSpeakingTestDto) {
    return this.speakingTestService.findAllOnlySpeakingTest(dto);
  }

  @Get(':id')
  @DecoratorWrapper('FindOneSpeakingTest')
  findOne(@Param('id') id: string) {
    return this.speakingTestService.findOne(id);
  }

  @Get('only/:id')
  @DecoratorWrapper('FindOneOnlySpeakingTest')
  async FindOneOnlySpeakingTest(@Param('id') id: string) {
    return this.speakingTestService.findOneOnlySpeakingTest(id);
  }

  @Delete(':id')
  @DecoratorWrapper('FindAllSpeakingTest', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingTestService.remove(id);
  }
}
