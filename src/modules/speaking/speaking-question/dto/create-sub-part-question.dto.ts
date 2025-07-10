import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateSubPartSpeakingQuestionDto {
  @ApiProperty({ example: 'uuid-of-speaking-test' })
  @IsUUID()
  @IsNotEmpty()
  speakingSubPartId: string;
  
  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: 'What is your name?' })
  @IsString()
  @IsNotEmpty()
  questionText: string;
}
