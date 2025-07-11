import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  phone: string;

  @IsString()
  code: string;
}
