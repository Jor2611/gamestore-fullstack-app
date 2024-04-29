import { IsEmail, IsString } from "class-validator";

export class SignUpAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}