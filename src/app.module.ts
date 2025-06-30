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
    FollowsModule,
    UserModule,
    TestModule,
    IeltsModule,
    ExamModule,
    FileModule,
  ],
})
export class AppModule {}
