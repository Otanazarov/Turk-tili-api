import { Module } from '@nestjs/common';
import { WritingSectionService } from './writing-section.service';
import { WritingSectionController } from './writing-section.controller';

@Module({
  controllers: [WritingSectionController],
  providers: [WritingSectionService],
})
export class WritingSectionModule {}
