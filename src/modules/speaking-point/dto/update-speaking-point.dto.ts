// update-speaking-point.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SpeakingPointType } from 'src/modules/speaking-test/dto/create-speaking-test.dto';

export class UpdateSpeakingPointDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ enum: SpeakingPointType, example: 'ADVANTAGE' })
  @IsOptional()
  @IsEnum(SpeakingPointType)
  type?: SpeakingPointType;

  @ApiPropertyOptional({ example: 'Updated point text here' })
  @IsOptional()
  @IsString()
  question?: string;
}
