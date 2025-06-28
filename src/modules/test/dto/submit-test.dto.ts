import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsString,
  IsUUID,
  ValidateNested,
  ValidateIf,
} from 'class-validator';

export class SubmitAnswerDto {
  @ApiProperty()
  @IsUUID()
  questionId: string;

  @ApiProperty({
    oneOf: [
      { type: 'string', example: 'A' },
      { type: 'array', items: { type: 'string' }, example: ['A', 'C'] },
    ],
  })
  @IsDefined()
  userAnswer: string | string[];
}

export class SubmitAnswersDto {
  @ApiProperty({ type: [SubmitAnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitAnswerDto)
  answers: SubmitAnswerDto[];
}
