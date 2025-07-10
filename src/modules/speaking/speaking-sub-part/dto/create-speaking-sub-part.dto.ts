import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSpeakingSubPartDto {
  @ApiProperty({ example: 'uuid-of-speaking-test' })
  @IsUUID()
  @IsNotEmpty()
  speakingSectionId: string;

  @ApiProperty({ example: '1.1' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({ example: 'Describe the picture' })
  @IsOptional()
  @IsString()
  description?: string;
}
