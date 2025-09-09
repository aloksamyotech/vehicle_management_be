import { IsString, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  bookingId: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
