import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOnlyWritingSectionDto {
  @ApiProperty({ example: 'uuid-of-writingTest' })
  @IsUUID()
  @IsNotEmpty()
  writingTestId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: 'Task 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Write a report based on a graph.' })
  @IsOptional()
  @IsString()
  description?: string;
}
