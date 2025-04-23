import { IsInt, IsString, IsPositive, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBookingExpenseDto {
  @ApiProperty({
    example: 123,
    description: 'ID of the booking to which the expense is related',
  })
  @IsInt()
  bookingId: number;

  @ApiProperty({
    example: 2500.75,
    description: 'Amount of the expense',
  })
  @IsPositive()
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 'Fuel charges for day 1',
    description: 'Description of the expense',
  })
  @IsString()
  description: string;
}
