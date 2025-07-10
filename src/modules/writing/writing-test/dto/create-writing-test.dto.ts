import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';


// ===== SUBPART DTO =====
export class CreateWritingSubPartDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: '1.1' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'Describe a graph showing population growth.' })
  @IsString()
  @IsNotEmpty()
  question: string;
}



// ===== SECTION DTO =====
export class CreateWritingSectionDto {
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

  @ApiProperty({ type: [CreateWritingSubPartDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWritingSubPartDto)
  subParts: CreateWritingSubPartDto[];
}



// ===== TEST DTO =====
export class CreateWritingTestDto {
  @ApiProperty({ example: 'IELTS Writing Test 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'You have 60 minutes to complete both tasks.',
  })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiProperty({ example: 'uuid-of-ielts-id' })
  @IsUUID()
  @IsNotEmpty()
  ieltsId: string;

  @ApiProperty({ type: [CreateWritingSectionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWritingSectionDto)
  sections: CreateWritingSectionDto[];
}


