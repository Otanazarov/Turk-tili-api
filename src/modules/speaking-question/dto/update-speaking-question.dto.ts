import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSpeakingQuestionDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ example: 'What is your name?' })
  @IsOptional()
  @IsString()
  question?: string;
}
