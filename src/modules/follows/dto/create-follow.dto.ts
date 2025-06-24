import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({
    example: '25c2d402-ef9c-4821-9ab7-645ad8cf7dd7',
  })
  @IsUUID()
  followingId: string;
}
