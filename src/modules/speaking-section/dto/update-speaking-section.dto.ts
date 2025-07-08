import { ApiPropertyOptional } from '@nestjs/swagger';
import { SpeakingSectionType } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSpeakingSectionDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ example: 'PART1', enum: SpeakingSectionType })
  @IsOptional()
  @IsEnum(SpeakingSectionType)
  type?: SpeakingSectionType;

  @ApiPropertyOptional({ example: 'Part 1: Personal questions' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'You will talk about yourself.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Savol matni' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
