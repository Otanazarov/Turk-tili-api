import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSectionDto {
  @ApiPropertyOptional({ example: 'Part 1 Section' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Read the following passage...' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: 'photo.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
