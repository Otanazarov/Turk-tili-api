import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePartDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  number: number;

  @ApiPropertyOptional({ example: 'Part 1 description' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'https://audio-url.mp3' })
  @IsString()
  @IsOptional()
  audioUrl?: string;

  @ApiProperty({ example: 'uuid-of-test' })
  @IsUUID()
  testId: string;
}
