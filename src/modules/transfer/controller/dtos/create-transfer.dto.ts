import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly receiverKey: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}
