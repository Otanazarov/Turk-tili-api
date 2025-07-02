import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePartDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  number?: number;

  @ApiPropertyOptional({ example: 'https://audio-url.mp3' })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiPropertyOptional({ example: 'Part 1 description' })
  @IsOptional()
  @IsString()
  title?: string;
}
