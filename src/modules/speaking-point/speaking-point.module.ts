import { Module } from '@nestjs/common';
import { SpeakingPointService } from './speaking-point.service';
import { SpeakingPointController } from './speaking-point.controller';

@Module({
  controllers: [SpeakingPointController],
  providers: [SpeakingPointService],
})
export class SpeakingPointModule {}
