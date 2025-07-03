import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWritingTestDto {
  @ApiPropertyOptional({ example: 'Updated Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'New Task 1 ...' })
  @IsOptional()
  @IsString()
  task1?: string;

  @ApiPropertyOptional({ example: 'New Task 2 ...' })
  @IsOptional()
  @IsString()
  task2?: string;

  @ApiPropertyOptional({ example: 'New TaskTitle' })
  @IsOptional()
  @IsString()
  task1Title?: string;

  @ApiPropertyOptional({example:"instruction"})
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiPropertyOptional({ example: 'New TaskTitle' })
  @IsOptional()
  @IsString()
  task2Title?: string;

  @ApiPropertyOptional({ example: 'WRITING' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: '6bffade8-73c9-4fc4-b33c-7826c9d3d3c9' })
  @IsOptional()
  @IsUUID()
  ieltsId?: string;
}
