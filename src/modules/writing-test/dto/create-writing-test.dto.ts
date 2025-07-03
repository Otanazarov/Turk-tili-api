import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWritingTestDto {
  @ApiProperty({ example: 'IELTS Writing Practice 1', description: 'Writing test sarlavhasi' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Formal letter to landlord', description: '1-topshiriq sarlavhasi' })
  @IsString()
  @IsNotEmpty()
  task1Title: string;

  @ApiProperty({ example: 'Essay about modern education', description: '2-topshiriq sarlavhasi' })
  @IsString()
  @IsNotEmpty()
  task2Title: string;

  @ApiProperty({ example: 'Write a formal letter to your landlord...', description: '1-topshiriq matni' })
  @IsString()
  @IsNotEmpty()
  task1: string;

  @ApiProperty({ example: 'Write an essay discussing...', description: '2-topshiriq matni' })
  @IsString()
  @IsNotEmpty()
  task2: string;

  @ApiPropertyOptional({ example: 'You should spend about 20 minutes on this task.', description: 'Yozish uchun ko‘rsatma' })
  @IsOptional()
  @IsString()
  instruction?: string;

  @ApiProperty({ example: '6bffade8-73c9-4fc4-b33c-7826c9d3d3c9', description: 'IELTS group ID' })
  @IsUUID()
  @IsNotEmpty()
  ieltsId: string;
}
