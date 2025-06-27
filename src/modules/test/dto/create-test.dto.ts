// create-test.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TestType, QuestionType } from '@prisma/client';

class AnswerDto {
  @ApiProperty({ example: 'Answer text' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  correct: boolean;
}

class QuestionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  number: number;

  @ApiProperty({ 
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE,
    description: 'Type of question'
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ example: 'Question text' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ type: [AnswerDto] })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @IsArray()
  answers: AnswerDto[];
}

class SectionDto {
  @ApiProperty({ example: 'Section title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Section content/passage' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ type: [QuestionDto] })
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  @IsArray()
  questions: QuestionDto[];
}

class PartDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  number: number;

  @ApiProperty({ example: 'Audio URL', required: false })
  @IsString()
  @IsOptional()
  audioUrl?: string;

  @ApiProperty({ type: [SectionDto] })
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  @IsArray()
  sections: SectionDto[];
}

export class CreateTestDto {
  @ApiProperty({ example: 'Test 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: TestType,
    example: TestType.LISTENING,
    description: 'Type of test (LISTENING or READING)'
  })
  @IsEnum(TestType)
  type: TestType;

  @ApiProperty({ example: 'ielts-uuid' })
  @IsString()
  @IsNotEmpty()
  ieltsId: string;

  @ApiProperty({ type: [PartDto] })
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  @IsArray()
  parts: PartDto[];
}
