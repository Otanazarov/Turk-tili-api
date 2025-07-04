import { IsEmail, IsString } from "class-validator";

// google-user.dto.ts
export class CreateGoogleUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    name: string;
  
    @IsString()
    avatarUrl: string;
  
    @IsString()
    provider: string;
  
    @IsString()
    googleId: string;
  }
  