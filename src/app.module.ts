import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { FollowsModule } from './modules/follows/follows.module';
import { UserModule } from './modules/user/user.module';
import { IeltsModule } from './modules/ielts/ielts.module';
import { FileModule } from './modules/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './common/auth/auth.module';
import { SmsModule } from './modules/sms/sms.module'; 
import { SpeakingModule } from './modules/speaking/speaking.module';
import { WritingModule } from './modules/writing/writing.module';
import { ListeningAndReadingModule } from './modules/listening-and-reading/listening-and-reading.module';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    AdminModule,
    UserModule,
    IeltsModule,
    ListeningAndReadingModule,
    SpeakingModule,
    WritingModule,
    PrismaModule,
    FileModule,
    FollowsModule,
    AuthModule,
    SmsModule,
  ],
})
export class AppModule {}
