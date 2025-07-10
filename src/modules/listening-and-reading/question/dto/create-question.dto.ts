import { ApiProperty } from "@nestjs/swagger";
import { QuestionType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateQuestionDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    number: number;
  
    @ApiProperty({ enum: QuestionType })
    @IsEnum(QuestionType)
    type: QuestionType;
  
    @ApiProperty({ example: 'What is 2 + 2?' })
    @IsString()
    @IsOptional()
    text?: string;
  
    @ApiProperty({ example: 'uuid-of-section' })
    @IsUUID()
    sectionId: string;
  }