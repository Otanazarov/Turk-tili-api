import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsNumber } from 'class-validator';

class AnswerSubmission {
  @ApiProperty({
    description: 'Question ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({
    description: 'User answer text',
    example: 'A' // Multiple choice uchun A,B,C... yoki text input uchun to'liq javob
  })
  @IsString()
  @IsNotEmpty()
  userAnswer: string;

  @ApiProperty({
    description: 'Time spent on this question in seconds',
    example: 60
  })
  @IsNumber()
  timeSpent: number;
}

export class SubmitTestDto {
  @ApiProperty({
    description: 'Test ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  testId: string;

  @ApiProperty({
    description: 'Array of user answers',
    type: [AnswerSubmission]
  })
  @IsArray()
  answers: AnswerSubmission[];
}