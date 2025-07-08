import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SmsService } from '../sms/sms.service';

@Module({
  controllers: [UserController],
  providers: [UserService, SmsService],
  exports: [UserService],
})
export class UserModule {}
