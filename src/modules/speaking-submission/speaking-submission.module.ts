import { Module } from '@nestjs/common';
import { SpeakingSubmissionService } from './speaking-submission.service';
import { SpeakingSubmissionController } from './speaking-submission.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';
import { OpenAIService } from '../openAI/openAI.service';
import { OpenAIModule } from '../openAI/openAI.module';

@Module({
  imports: [PrismaModule, FileModule, OpenAIModule],
  controllers: [SpeakingSubmissionController],
  providers: [SpeakingSubmissionService],
})
export class SpeakingSubmissionModule {}
