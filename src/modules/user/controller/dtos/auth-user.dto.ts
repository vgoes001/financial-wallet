import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly password: string;
}
