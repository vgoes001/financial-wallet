import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly receiverKey: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}
