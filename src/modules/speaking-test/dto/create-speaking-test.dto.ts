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

// 1️⃣ ENUM
export enum SpeakingSectionType {
  PART1 = 'PART1',
  PART2 = 'PART2',
  PART3 = 'PART3',
}

// 2️⃣ QUESTION DTO
export class CreateSpeakingQuestionDto {
  @ApiProperty({ example: 1, description: 'Savol tartib raqami' })
  @IsNumber()
  order: number;

  @ApiProperty({ example: 'What is your name?' })
  @IsString()
  @IsNotEmpty()
  question: string;
}

// 3️⃣ SUBPART DTO (faqat PART1 uchun)
export class CreateSpeakingSubPartDto {
  @ApiProperty({ example: '1.1', description: 'SubPart belgisi' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({ example: 'Describe the picture' })
  @IsOptional()
  @IsString()
  description?: string;

  

  @ApiProperty({
    description: 'SubPart ichidagi savollar',
    type: [CreateSpeakingQuestionDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingQuestionDto)
  questions: CreateSpeakingQuestionDto[];
}

// 4️⃣ SECTION DTO (PART1, PART2, PART3)
export class CreateSpeakingSectionDto {
  @ApiProperty({ example: 1, description: 'Section tartib raqami (1, 2, 3)' })
  @IsNumber()
  order: number;
  @ApiProperty({ example: 'PART1', enum: SpeakingSectionType })
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
}

// 5️⃣ SPEAKING TEST DTO (asosiy DTO)
export class CreateSpeakingTestDto {
  @ApiProperty({ example: 'IELTS Speaking Test 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'uuid-ielts-id', description: 'IELTS group ID' })
  @IsUUID()
  @IsNotEmpty()
  ieltsId: string;

  @ApiProperty({
    description: 'Speaking test qismlari (Part1, Part2, Part3)',
    type: [CreateSpeakingSectionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingSectionDto)
  sections: CreateSpeakingSectionDto[];
}
