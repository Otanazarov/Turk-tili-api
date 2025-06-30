import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { TestType } from '@prisma/client';
import { UpdatePartDto } from './update-part.dto';
import { Type } from 'class-transformer';

export class UpdateTestDto {
  @ApiPropertyOptional({ example: 'Test 1' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Listening Test' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: TestType, example: TestType.LISTENING })
  @IsOptional()
  @IsEnum(TestType)
  type?: TestType;

  @ApiPropertyOptional({ example: 'd1a22aeb-9b4c-4b49-a913-456eef781111' })
  @IsOptional()
  @IsUUID()
  ieltsId?: string;
}
