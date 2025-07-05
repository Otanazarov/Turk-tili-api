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
import { UpdateSpeakingTestDto } from './dto/update-speaking-test.dto';

import { RolesGuard } from '../../common/auth/roles/roles.guard';
import { Roles } from '../../common/auth/roles/roles.decorator';
import { Role } from '@prisma/client';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { FindAllSpeakingTestDto } from './dto/findAll-speaking.test.dto';

@ApiTags('Speaking Test')
@Controller('speaking-test')
export class SpeakingTestController {
  constructor(private readonly speakingTestService: SpeakingTestService) {}

  @Post()
  @DecoratorWrapper('CreateSpeakingTest', true, [Role.ADMIN])
  create(@Body() createSpeakingTestDto: CreateSpeakingTestDto) {
    return this.speakingTestService.create(createSpeakingTestDto);
  }

  @Get()
  @DecoratorWrapper('FindAllSpeakingTest')
  findAll(@Query() dto: FindAllSpeakingTestDto) {
    return this.speakingTestService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('FindOneSpeakingTest')
  findOne(@Param('id') id: string) {
    return this.speakingTestService.findOne(id);
  }

  @Delete(':id')
  @DecoratorWrapper('FindAllSpeakingTest', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingTestService.remove(id);
  }
}
