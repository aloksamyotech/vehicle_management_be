import { IsInt, IsString, IsPositive, IsNumber } from 'class-validator';

export class AddBookingExpenseDto {
  @IsInt()
  bookingId: number;

  @IsPositive()
  @IsNumber()
  amount: number;

  @IsString()
  description: string;
}
