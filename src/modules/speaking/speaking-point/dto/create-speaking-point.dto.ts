import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { SpeakingPointType } from 'src/modules/speaking/speaking-test/dto/create-speaking-test.dto';

export class CreateSpeakingPointDto {
  @ApiProperty({ example: 'uuid-of-speaking-test' })
  @IsUUID()
  @IsNotEmpty()
  speakingSectionId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ enum: SpeakingPointType, example: 'ADVANTAGE' })
  @IsEnum(SpeakingPointType)
  type: SpeakingPointType;

  @ApiProperty({ example: 'University provides professional skills.' })
  @IsString()
  @IsNotEmpty()
  questionText: string;
}
