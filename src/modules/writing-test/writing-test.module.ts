import { Module } from '@nestjs/common';
import { WritingTestService } from './writing-test.service';
import { WritingTestController } from './writing-test.controller';

@Module({
  controllers: [WritingTestController],
  providers: [WritingTestService],
})
export class WritingTestModule {}
