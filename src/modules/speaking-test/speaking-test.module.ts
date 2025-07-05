import { Module } from '@nestjs/common';
import { SpeakingTestService } from './speaking-test.service';
import { SpeakingTestController } from './speaking-test.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SpeakingTestController],
  providers: [SpeakingTestService],
})
export class SpeakingTestModule {}
