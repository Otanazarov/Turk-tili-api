import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class updateOnlySpeakingTestDto {
  @ApiPropertyOptional({ example: 'Updated IELTS Speaking Test 1' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'uuid-ielts-id', description: 'IELTS group ID' })
  @IsOptional()
  @IsUUID()
  ieltsId?: string;
}
