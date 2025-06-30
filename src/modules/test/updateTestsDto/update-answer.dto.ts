import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @ApiPropertyOptional({ example: 'A', description: 'Variant label (optional)' })
  @IsOptional()
  @IsString()
  variant?: string;

  @ApiPropertyOptional({ example: 'Follow me', description: 'Answer text' })
  @IsOptional()
  @IsString()
  variantText?: string;

  @ApiPropertyOptional({ example: 'A or apple', description: 'Actual answer value' })
  @IsOptional()
  @IsString()
  answer?: string;

  @ApiPropertyOptional({ example: true, description: 'Is this correct?' })
  @IsOptional()
  @IsBoolean()
  correct?: boolean;
}
