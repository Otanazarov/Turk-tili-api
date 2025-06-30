import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestUpdateService } from './test.update.service';

@Module({
  controllers: [TestController],
  providers: [TestService, TestUpdateService],
})
export class TestModule {}
