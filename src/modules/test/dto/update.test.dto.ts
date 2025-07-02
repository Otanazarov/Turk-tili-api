import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TestType } from '@prisma/client'; // yoki enums fayling bo‘lsa, o‘shandan import qil

export class UpdateTestDto {
  @ApiPropertyOptional({ example: 'Test 1', description: 'Title of the test' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Listening Test',
    description: 'Description of the test',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: TestType,
    example: TestType.LISTENING,
    description: 'Test type: LISTENING or READING',
  })
  @IsOptional()
  @IsEnum(TestType)
  type?: TestType;

  @ApiPropertyOptional({
    example: 'd1a22aeb-9b4c-4b49-a913-456eef781111',
    description: 'IELTS test group ID',
  })
  @IsOptional()
  @IsUUID()
  @IsString()
  ieltsId?: string;
}
