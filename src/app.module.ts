import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { FollowsModule } from './modules/follows/follows.module';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { IeltsModule } from './modules/ielts/ielts.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    AdminModule,
    PrismaModule,
    FollowsModule,
    UserModule,
    TestModule,
    IeltsModule,
  ],
})
export class AppModule {}
