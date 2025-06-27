import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIeltsDto {
  @ApiProperty({
    description: 'IELTS test title',
    example: 'IELTS Academic Test 1',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
