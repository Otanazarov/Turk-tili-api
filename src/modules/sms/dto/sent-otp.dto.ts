import { IsString, Length } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @Length(9, 12)
  phone: string;
}
