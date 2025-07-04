import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { FollowsModule } from './modules/follows/follows.module';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { IeltsModule } from './modules/ielts/ielts.module';
import { ExamModule } from './modules/exam/exam.module';
import { FileModule } from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PartsModule } from './modules/parts/parts.module';
import { SectionModule } from './modules/section/section.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { WritingTestModule } from './modules/writing-test/writing-test.module';
import { AuthModule } from './common/auth/auth.module';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AdminModule,
    PrismaModule,
    UserModule,
    IeltsModule,
    TestModule,
    PartsModule,
    SectionModule,
    QuestionModule,
    AnswerModule,
    ExamModule,
    FileModule,
    FollowsModule,
    WritingTestModule,
    AuthModule,
  ],
})
export class AppModule {}
