import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';

export class CreateListeningAnswerDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  answerText: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}

export class CreateListeningQuestionDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ApiProperty({ enum: QuestionType })
  @IsNotEmpty()
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiProperty({ type: [CreateListeningAnswerDto] })
  @Type(() => CreateListeningAnswerDto)
  @ValidateNested()
  answers: CreateListeningAnswerDto[];
}

export class CreateListeningSectionDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  audioUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ApiProperty({ type: [CreateListeningQuestionDto] })
  @Type(() => CreateListeningQuestionDto)
  @ValidateNested()
  questions: CreateListeningQuestionDto[];
}

export class CreateListeningPassageDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @ApiProperty({ type: [CreateListeningSectionDto] })
  @Type(() => CreateListeningSectionDto)
  @ValidateNested()
  sections: CreateListeningSectionDto[];
}

export class CreateListeningTestDto {
  @IsName()
  title: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: [CreateListeningPassageDto] })
  @Type(() => CreateListeningPassageDto)
  @ValidateNested()
  passages: CreateListeningPassageDto[];
}
