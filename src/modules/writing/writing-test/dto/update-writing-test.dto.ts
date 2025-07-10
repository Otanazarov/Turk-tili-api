import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateWritingSubPartDto {
  @ApiPropertyOptional({ example: '1.1' })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiPropertyOptional({ example: 'New question text' })
  @IsOptional()
  @IsString()
  question?: string;
} 

export class UpdateWritingSectionDto {
  @ApiPropertyOptional({ example: 'Task 1 - Updated' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated task description.' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateWritingTestDto {
  @ApiPropertyOptional({ example: 'Updated IELTS Writing Test Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated instruction for the test.' })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiPropertyOptional({ example: 'uuid-of-ielts-id' })
  @IsOptional()
  @IsUUID()
  ieltsId?: string;
}

