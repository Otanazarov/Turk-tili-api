import { Module } from '@nestjs/common';
import { SpeakingPointModule } from './speaking-point/speaking-point.module';
import { SpeakingQuestionModule } from './speaking-question/speaking-question.module';
import { SpeakingSectionModule } from './speaking-section/speaking-section.module';
import { SpeakingSubPartModule } from './speaking-sub-part/speaking-sub-part.module';
import { SpeakingTestModule } from './speaking-test/speaking-test.module';
import { SpeakingSubmissionModule } from './speaking-submission/speaking-submission.module';

@Module({
  imports: [
    SpeakingTestModule,
    SpeakingSectionModule,
    SpeakingSubPartModule,
    SpeakingQuestionModule,
    SpeakingPointModule,
    SpeakingSubmissionModule,
  ],
})
export class SpeakingModule {}
