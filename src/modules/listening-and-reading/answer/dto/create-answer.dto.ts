import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ example: 'A or apple' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiPropertyOptional({ example: 'follow me' })
  @IsString()
  @IsOptional()
  variantText?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  correct: boolean;

  @ApiProperty({ example: 'uuid-of-question' })
  @IsUUID()
  questionId: string;
}
