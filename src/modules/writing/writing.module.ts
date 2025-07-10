import { Module } from '@nestjs/common';
import { WritingSectionModule } from './writing-section/writing-section.module';
import { WritingSubPartModule } from './writing-sub-part/writing-sub-part.module';
import { WritingTestModule } from './writing-test/writing-test.module';

@Module({
  imports: [WritingTestModule, WritingSectionModule, WritingSubPartModule],
})
export class WritingModule {}
