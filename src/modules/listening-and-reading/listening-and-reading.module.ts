import { Module } from '@nestjs/common';
import { AnswerModule } from './answer/answer.module';
import { ExamModule } from './exam/exam.module';
import { PartsModule } from './parts/parts.module';
import { QuestionModule } from './question/question.module';
import { SectionModule } from './section/section.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TestModule,
    PartsModule,
    SectionModule,
    QuestionModule,
    AnswerModule,
    ExamModule,
  ],
})
export class ListeningAndReadingModule {}
