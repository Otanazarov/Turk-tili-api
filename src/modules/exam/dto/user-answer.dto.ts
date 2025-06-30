import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UserAnswerDto {
  @ApiProperty()
  @IsUUID()
  testResulId: string;
}
