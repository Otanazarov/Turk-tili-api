import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TestType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTestDto {
  @ApiPropertyOptional({ example: 'Test 1', description: 'Title of the test' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    example: 'Listening Test',
    description: 'Description of the test',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TestType,
    example: TestType.LISTENING,
    description: 'Test type: LISTENING or READING',
  })
  @IsEnum(TestType)
  type: TestType;

  @ApiProperty({
    example: 'd1a22aeb-9b4c-4b49-a913-456eef781111',
    description: 'IELTS test group ID',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  ieltsId: string;
}
