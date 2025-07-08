import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateSpeakingQuestionDto {
  @ApiProperty({ example: 'uuid-of-speaking-test' })
  @IsUUID()
  @IsNotEmpty()
  speakingSectionId: string;
  
  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: 'What is your name?' })
  @IsString()
  @IsNotEmpty()
  question: string;
}
