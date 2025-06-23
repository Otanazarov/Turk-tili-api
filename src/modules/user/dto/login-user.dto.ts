import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'string' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
