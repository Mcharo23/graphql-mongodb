import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsEmail()
  customer: string;
}
