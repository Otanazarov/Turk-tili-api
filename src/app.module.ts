import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { FollowsModule } from './modules/follows/follows.module';
import { UserModule } from './modules/user/user.module';

@Module({
  controllers: [],
  providers: [],
  imports: [AdminModule, PrismaModule, FollowsModule,UserModule],
})
export class AppModule {}
