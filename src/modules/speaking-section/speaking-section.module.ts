import { Module } from '@nestjs/common';
import { SpeakingSectionService } from './speaking-section.service';
import { SpeakingSectionController } from './speaking-section.controller';

@Module({
  controllers: [SpeakingSectionController],
  providers: [SpeakingSectionService],
})
export class SpeakingSectionModule {}
