import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { SpeakingSubmissionService } from './speaking-submission.service';
import { CreateSpeakingSubmissionDto } from './dto/create-speaking-submission.dto';
import { Role } from '@prisma/client';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { FindAllSpeakingSubmissionDto } from './dto/findAll-speaking.submission.dto';
import { UpdateSpeakingSubmissionDto } from './dto/update-speaking-submisson.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@ApiTags('Speaking Submission')
@Controller('speaking-submission')
export class SpeakingSubmissionController {
  constructor(
    private readonly speakingSubmissionService: SpeakingSubmissionService,
  ) {}

  @Post('speech-to-text')
  @DecoratorWrapper('Speech to text', true, [Role.USER, Role.ADMIN])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  speechToText(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.speakingSubmissionService.speechToText(files);
  }

  @Post()
  @DecoratorWrapper('CreateSpeakingSubmission', true, [Role.USER, Role.ADMIN])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() createSpeakingSubmissionDto: CreateSpeakingSubmissionDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    const userId = req.user['id'];
    return this.speakingSubmissionService.create(
      createSpeakingSubmissionDto,
      files,
      userId,
    );
  }

  @Get()
  @DecoratorWrapper('FindAllSpeakingSubmissions', true, [Role.ADMIN])
  findAll(@Query() dto: FindAllSpeakingSubmissionDto) {
    return this.speakingSubmissionService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('FindOneSpeakingSubmission', true, [Role.USER, Role.ADMIN])
  findOne(@Param('id') id: string) {
    return this.speakingSubmissionService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('UpdateSpeakingSubmission', true, [Role.ADMIN])
  update(
    @Param('id') id: string,
    @Body() updateSpeakingSubmissionDto: UpdateSpeakingSubmissionDto,
  ) {
    return this.speakingSubmissionService.update(
      id,
      updateSpeakingSubmissionDto,
    );
  }

  @Delete(':id')
  @DecoratorWrapper('DeleteSpeakingSubmission', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.speakingSubmissionService.remove(id);
  }
}
