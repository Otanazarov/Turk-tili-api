import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/* ENUMS */

export enum SpeakingSectionType {
  PART1 = 'PART1',
  PART2 = 'PART2',
  PART3 = 'PART3',
}

export enum SpeakingPointType {
  ADVANTAGE = 'ADVANTAGE',
  DISADVANTAGE = 'DISADVANTAGE',
}

/* QUESTION DTO */
export class CreateSpeakingQuestionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: 'What is your name?' })
  @IsString()
  @IsNotEmpty()
  question: string;
}

/* POINT DTO - PART3 uchun */
export class CreateSpeakingPointDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ enum: SpeakingPointType, example: 'ADVANTAGE' })
  @IsEnum(SpeakingPointType)
  type: SpeakingPointType;

  @ApiProperty({ example: 'University provides professional skills.' })
  @IsString()
  @IsNotEmpty()
  question: string;
}

/* SUBPART DTO - faqat PART1 uchun */
export class CreateSpeakingSubPartDto {
  @ApiProperty({ example: '1.1' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({ example: 'Describe the picture' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: [CreateSpeakingQuestionDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingQuestionDto)
  questions: CreateSpeakingQuestionDto[];
}

/* SECTION DTO */
export class CreateSpeakingSectionDto {
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

  @ApiPropertyOptional({
    type: [CreateSpeakingSubPartDto],
    description: 'PART1 uchun subPartlar',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingSubPartDto)
  subParts?: CreateSpeakingSubPartDto[];

  @ApiPropertyOptional({
    type: [CreateSpeakingQuestionDto],
    description: 'PART2 yoki PART3 uchun savollar',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingQuestionDto)
  questions?: CreateSpeakingQuestionDto[];

  @ApiPropertyOptional({
    type: [CreateSpeakingPointDto],
    description: 'PART3 uchun ijobiy va salbiy fikrlar',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingPointDto)
  points?: CreateSpeakingPointDto[];
}

/* MAIN DTO */
export class CreateSpeakingTestDto {
  @ApiProperty({ example: 'IELTS Speaking Test 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'uuid-ielts-id' })
  @IsUUID()
  @IsNotEmpty()
  ieltsId: string;

  @ApiProperty({
    type: [CreateSpeakingSectionDto],
    description: 'Speaking test qismlari (Part1, Part2, Part3)',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingSectionDto)
  sections: CreateSpeakingSectionDto[];
}
