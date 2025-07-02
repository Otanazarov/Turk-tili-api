import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TestType, QuestionType } from '@prisma/client';

export class AnswerDto {
  @ApiPropertyOptional({
    example: 'follow me',
    required: false,
    description: 'Answer variant text',
  })
  @IsString()
  @IsOptional()
  variantText?: string;

  @ApiPropertyOptional({
    example: 'A or apple',
    description: 'Answer text or value',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: true, description: 'Is this the correct answer?' })
  @IsBoolean()
  correct: boolean;
}

export class QuestionDto {
  @ApiProperty({ example: 1, description: 'Question number in the section' })
  @IsNumber()
  number: number;

  @ApiProperty({
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE,
    description: 'Type of the question',
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    example: 'What do trees produce?',
    description: 'Question text',
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    type: [AnswerDto],
    description: 'Answer options for the question',
  })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @IsArray()
  answers: AnswerDto[];
}

export class SectionDto {
  @ApiProperty({ example: 'Part 1 Section', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Read the following passage...', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'photo.jpg', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    type: [QuestionDto],
    description: 'Questions within the section',
  })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @IsArray()
  questions: QuestionDto[];
}

export class PartDto {
  @ApiProperty({
    example: 1,
    description: 'Part number (e.g., Part 1, Part 2)',
  })
  @IsNumber()
  number: number;

  @ApiProperty({ example: 'https://audio-url.mp3', required: false })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiPropertyOptional({ example: 'Part 1 description', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: [SectionDto],
    description: 'Sections inside the part',
  })
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  @IsArray()
  sections: SectionDto[];
}

export class CreateAllTestDto {
  @ApiProperty({ example: 'Test 1', description: 'Title of the test' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({
    example: 'Listening Test',
    description: 'Description of the test',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TestType,
    example: TestType.LISTENING,
    description: 'Test type: LISTENING or READING',
  })
  @IsEnum(TestType)
  type: TestType;

  @ApiProperty({
    example: 'd1a22aeb-9b4c-4b49-a913-456eef781111',
    description: 'IELTS test group ID',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  ieltsId: string;

  @ApiProperty({
    type: [PartDto],
    description: 'List of parts in the test',
  })
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  @IsArray()
  parts: PartDto[];
}
