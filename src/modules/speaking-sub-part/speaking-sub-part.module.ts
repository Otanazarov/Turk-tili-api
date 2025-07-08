import { Module } from '@nestjs/common';
import { SpeakingSubPartService } from './speaking-sub-part.service';
import { SpeakingSubPartController } from './speaking-sub-part.controller';

@Module({
  controllers: [SpeakingSubPartController],
  providers: [SpeakingSubPartService],
})
export class SpeakingSubPartModule {}
