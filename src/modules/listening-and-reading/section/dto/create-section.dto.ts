import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSectionDto {
  @ApiPropertyOptional({ example: 'Reading Passage 1' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Passage content...' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: 'photo.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 'uuid-of-part' })
  @IsUUID()
  partId: string;
}
