// dto/update-writing-subpart.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateWritingSubPartDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ example: '1.1' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ example: 'Describe the population graph.' })
  @IsOptional()
  @IsString()
  question?: string;
}
