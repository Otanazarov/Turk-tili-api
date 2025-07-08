import { Global, Module } from '@nestjs/common';
import { OpenAIService } from './openAI.service';

@Global()
@Module({
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
