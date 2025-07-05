import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class createOnlySpeakingTestDto {
  @ApiProperty({ example: 'IELTS Speaking Test 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'uuid-ielts-id', description: 'IELTS group ID' })
  @IsUUID()
  @IsNotEmpty()
  ieltsId: string;
}
