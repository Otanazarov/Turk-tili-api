import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';
import { IsPassword } from 'src/common/dtos/password.dto';
import { IELTSLevel } from '@prisma/client'; // enum bo‘lsa
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsName(false)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(IELTSLevel)
  level?: IELTSLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  targetScore?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPassword(false)
  newPassword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPassword(false)
  oldPassword?: string;
}
