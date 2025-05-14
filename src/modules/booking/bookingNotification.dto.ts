import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingNotificationDto {
  @ApiProperty({ example: 12, description: 'ID of the booking' })
  @IsInt()
  @IsNotEmpty()
  bookingId: number;

  @ApiProperty({ example: 123, description: 'ID of the driver' })
  @IsInt()
  @IsNotEmpty()
  driverId: number;

  @ApiProperty({
    example: 'Your booking has been confirmed.',
    description: 'Notification message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: 'booking',
    description: 'Type of the notification (booking, cancelled, completed)',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
