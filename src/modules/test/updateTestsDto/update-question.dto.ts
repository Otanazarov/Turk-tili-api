import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestionType } from '@prisma/client';

export class UpdateQuestionDto {
  @ApiPropertyOptional({ example: 1, description: 'Question number' })
  @IsOptional()
  @IsNumber()
  number?: number;

  @ApiPropertyOptional({ example: 'MULTIPLE_CHOICE' })
  @IsOptional()
  @IsEnum(QuestionType)
  type?: QuestionType;

  @ApiPropertyOptional({ example: 'What do trees produce?' })
  @IsOptional()
  @IsString()
  text?: string;
}
