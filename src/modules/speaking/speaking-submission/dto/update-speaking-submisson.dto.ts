import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateSpeakingSubmissionDto {
  @ApiPropertyOptional({
    description: 'Overall score for the speaking submission.',
    example: 7.5,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(9)
  score?: number;
}
