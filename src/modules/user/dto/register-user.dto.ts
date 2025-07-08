import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';
import { IsPassword } from 'src/common/dtos/password.dto';

export class RegisterUserDto {
  @IsName()
  name: string;

  @IsPassword()
  password: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  avatarUrl: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  userName: string;
}
