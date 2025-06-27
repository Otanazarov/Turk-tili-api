import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';
import { IsPassword } from 'src/common/dtos/password.dto';

export class RegisterUserDto {
  @IsName()
  name: string;

  @IsPassword()
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;
}
