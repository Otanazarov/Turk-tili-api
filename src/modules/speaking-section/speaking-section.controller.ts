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
import { SpeakingSectionService } from './speaking-section.service';
import { CreateOnlySpeakingSectionDto } from './dto/create-speaking-section.dto';
import { UpdateSpeakingSectionDto } from './dto/update-speaking-section.dto';
import { FindAllSpeakingSectionDto } from './dto/findAll-speaking-section.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('speaking-section')
export class SpeakingSectionController {
  constructor(
    private readonly speakingSectionService: SpeakingSectionService,
  ) {}

  @Post()
  @DecoratorWrapper('createSpeakingSection', true, [Role.ADMIN])
  create(@Body() createSpeakingSectionDto: CreateOnlySpeakingSectionDto) {
    return this.speakingSectionService.create(createSpeakingSectionDto);
  }

  @Get()
  @DecoratorWrapper('findAllSpeakingSection')
  findAll(@Query() dto: FindAllSpeakingSectionDto) {
    return this.speakingSectionService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneSpeakingSection')
  findOne(@Param('id') id: string) {
    return this.speakingSectionService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateSpeakingSection', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateSpeakingSectionDto: UpdateSpeakingSectionDto,
  ) {
    return this.speakingSectionService.update(id, updateSpeakingSectionDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeSpeakingSection', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingSectionService.remove(id);
  }
}
