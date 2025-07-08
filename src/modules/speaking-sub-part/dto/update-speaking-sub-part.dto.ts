// update-speaking-subpart.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSpeakingSubPartDto {
  @ApiPropertyOptional({ example: '1.1' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ example: 'Describe the picture in detail' })
  @IsOptional()
  @IsString()
  description?: string;
}
