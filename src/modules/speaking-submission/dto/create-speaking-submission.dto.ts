import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';

export class AnswerSubmissionDto {
  @ApiProperty({
    description: 'The ID of the question being answered.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsUUID()
  questionId: string;
}

export class CreateSpeakingSubmissionDto {
  @ApiProperty({
    description: 'The ID of the speaking test being submitted.',
    example: 'f0e9d8c7-b6a5-4321-fedc-ba9876543210',
  })
  @IsUUID()
  speakingTestId: string;

  @ApiProperty({
    type: [AnswerSubmissionDto],
    description: 'Array of answers for the speaking test questions.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerSubmissionDto)
  answers: AnswerSubmissionDto[];
}
