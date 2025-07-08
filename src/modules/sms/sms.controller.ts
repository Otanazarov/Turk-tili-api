import { Controller, Post, Body } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @DecoratorWrapper('eskiz sms')
  create(@Body() createSmsDto: CreateSmsDto) {
    return this.smsService.sendSms(createSmsDto);
  }
}
