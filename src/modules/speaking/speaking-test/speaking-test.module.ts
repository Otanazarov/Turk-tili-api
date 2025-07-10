import { Module } from '@nestjs/common';
import { SpeakingTestService } from './speaking-test.service';
import { SpeakingTestController } from './speaking-test.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { OpenAIModule } from '../../openAI/openAI.module';

@Module({
  imports: [PrismaModule, OpenAIModule],
  controllers: [SpeakingTestController],
  providers: [SpeakingTestService],
})
export class SpeakingTestModule {}
