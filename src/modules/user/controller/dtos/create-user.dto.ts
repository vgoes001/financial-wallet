import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;
}
