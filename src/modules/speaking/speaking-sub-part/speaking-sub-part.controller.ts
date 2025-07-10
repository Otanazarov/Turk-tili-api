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
import { SpeakingSubPartService } from './speaking-sub-part.service';
import { CreateSpeakingSubPartDto } from './dto/create-speaking-sub-part.dto';
import { UpdateSpeakingSubPartDto } from './dto/update-speaking-sub-part.dto';
import { FindAllSpeakingSubPartDto } from './dto/findAll-speaking-sub-part.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';

@Controller('speaking-sub-part')
export class SpeakingSubPartController {
  constructor(
    private readonly speakingSubPartService: SpeakingSubPartService,
  ) {}

  @Post()
  @DecoratorWrapper('createSpeakingSubPart', true, [Role.ADMIN])
  create(@Body() createSpeakingSubPartDto: CreateSpeakingSubPartDto) {
    return this.speakingSubPartService.create(createSpeakingSubPartDto);
  }

  @Get()
  @DecoratorWrapper('findAllSpeakingSubPart')
  findAll(@Query() dto: FindAllSpeakingSubPartDto) {
    return this.speakingSubPartService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneSpeakingSubPart')
  findOne(@Param('id') id: string) {
    return this.speakingSubPartService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateSpeakingSubPart', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateSpeakingSubPartDto: UpdateSpeakingSubPartDto,
  ) {
    return this.speakingSubPartService.update(id, updateSpeakingSubPartDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeSpeakingSubPart', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingSubPartService.remove(id);
  }
}
