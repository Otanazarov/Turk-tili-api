import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SpeakingSectionType } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOnlySpeakingSectionDto {
  @ApiProperty({ example: 'uuid-of-speaking-test' })
  @IsUUID()
  @IsNotEmpty()
  speakingTestId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ enum: SpeakingSectionType, example: 'PART1' })
  @IsEnum(SpeakingSectionType)
  type: SpeakingSectionType;

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

  @ApiPropertyOptional({
    example: ['https://cdn.com/part2.jpg'],
    description: 'Rasmlar (faqat PART2 uchun kerak bo‘lishi mumkin)',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
