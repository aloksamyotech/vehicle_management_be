import { IsInt, IsString, IsPositive, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  bookingId: number;

  @IsPositive()
  @IsNumber()
  paidAmount: number;

  @IsPositive()
  @IsNumber()
  pendingAmount: number;

  @IsString()
  notes: string;
}
