import { IsInt, IsString, IsPositive, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 101, description: 'ID of the related booking' })
  @IsInt()
  bookingId: number;

  @ApiProperty({ example: 5000, description: 'Amount that has been paid' })
  @IsPositive()
  @IsNumber()
  paidAmount: number;

  @ApiProperty({ example: 1500, description: 'Remaining amount to be paid' })
  @IsPositive()
  @IsNumber()
  pendingAmount: number;

  @ApiProperty({ example: 'Advance payment received', description: 'Additional payment notes' })
  @IsString()
  notes: string;
}
