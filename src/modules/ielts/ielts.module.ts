import { Module } from '@nestjs/common';
import { IeltsService } from './ielts.service';
import { IeltsController } from './ielts.controller';

@Module({
  controllers: [IeltsController],
  providers: [IeltsService],
})
export class IeltsModule {}
