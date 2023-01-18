import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCardDTO {
  @IsNumber()
  card_number?: number;
  @IsNumber()
  cvv?: number;
  @IsString()
  expiration_month?: string;
  @IsString()
  expiration_year?: string;
  @IsEmail()
  email?: string;
  @IsString()
  @IsOptional()
  token?: string;
}
