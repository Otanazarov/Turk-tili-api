import { Module } from '@nestjs/common';
import { WritingSubPartService } from './writing-sub-part.service';
import { WritingSubPartController } from './writing-sub-part.controller';

@Module({
  controllers: [WritingSubPartController],
  providers: [WritingSubPartService],
})
export class WritingSubPartModule {}
