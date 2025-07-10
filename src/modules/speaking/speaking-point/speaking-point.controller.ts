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
import { SpeakingPointService } from './speaking-point.service';
import { CreateSpeakingPointDto } from './dto/create-speaking-point.dto';
import { UpdateSpeakingPointDto } from './dto/update-speaking-point.dto';
import { FindAllSpeakingPointDto } from './dto/findAll-speaking-point.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('speaking-point')
export class SpeakingPointController {
  constructor(private readonly speakingPointService: SpeakingPointService) {}

  @Post()
  @DecoratorWrapper('createSpeakingPoint', true, [Role.ADMIN])
  create(@Body() createSpeakingPointDto: CreateSpeakingPointDto) {
    return this.speakingPointService.create(createSpeakingPointDto);
  }

  @Get()
  @DecoratorWrapper('findAllSpeakingPoint')
  findAll(@Query() dto: FindAllSpeakingPointDto) {
    return this.speakingPointService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneSpeakingPoint')
  findOne(@Param('id') id: string) {
    return this.speakingPointService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateSpeakingPoint', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateSpeakingPointDto: UpdateSpeakingPointDto,
  ) {
    return this.speakingPointService.update(id, updateSpeakingPointDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeSpeakingPoint', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingPointService.remove(id);
  }
}
