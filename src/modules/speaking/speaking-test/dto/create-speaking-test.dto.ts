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
  questionText: string;
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
    example: [
      {
        order: 1,
        question: 'What is your name?',
      },
    ],
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

  @ApiPropertyOptional({ example: 'Part 1: Personal questionsss' })
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
    example: [
      {
        label: '1.1',
        description: 'Describe the picture',
        questions: [
          { order: 1, question: 'What is your name?' },
          { order: 2, question: 'Do you have pets?' },
        ],
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingSubPartDto)
  subParts?: CreateSpeakingSubPartDto[];

  @ApiPropertyOptional({
    type: [CreateSpeakingQuestionDto],
    description: 'PART2 yoki PART3 uchun savollar',
    example: [
      {
        order: 1,
        question: 'What do you do?',
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingQuestionDto)
  questions?: CreateSpeakingQuestionDto[];

  @ApiPropertyOptional({
    type: [CreateSpeakingPointDto],
    description: 'PART3 uchun ijobiy va salbiy fikrlar',
    example: [
      {
        order: 1,
        type: 'ADVANTAGE',
        questionText: 'University provides professional skills.',
      },
      {
        order: 2,
        type: 'DISADVANTAGE',
        questionText: 'Not everyone can afford university.',
      },
    ],
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
    example: [
      {
        order: 1,
        type: 'PART1',
        title: 'Part 1',
        description: 'Introductory questions',
        content: 'Let’s talk about your home town.',
        images: ['https://cdn.com/image.jpg'],
        subParts: [
          {
            label: '1.1',
            description: 'Describe your room',
            questions: [
              { order: 1, question: 'Do you live in a house or an apartment?' },
              { order: 2, question: 'What do you like about your room?' },
            ],
          },
        ],
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpeakingSectionDto)
  sections: CreateSpeakingSectionDto[];
}
