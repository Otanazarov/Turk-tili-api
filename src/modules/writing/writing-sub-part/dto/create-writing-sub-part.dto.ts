import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateOnlyWritingSubPartDto {
  @ApiProperty({ example: 'uuid-of-section' })
  @IsUUID()
  @IsNotEmpty()
  sectionId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order: number;

  @ApiProperty({ example: '1.1' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'Describe a graph showing population growth.' })
  @IsString()
  @IsNotEmpty()
  question: string;
}
