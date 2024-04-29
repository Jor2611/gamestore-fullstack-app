import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  rememberMe: boolean;
}