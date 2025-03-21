import { IsInt, IsOptional, IsPositive, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateFuelDto {
  @IsInt()
  vehicleId: number;

  @IsInt()
  driverId: number;

  @IsDate()
  fillDate: Date;

  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsInt()
  @IsPositive()
  odometerReading: number;

  @IsPositive()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  comments?: string;
}

export class UpdateFuelDto {
  @IsOptional()
  @IsInt()
  vehicleId: number;

  @IsOptional()
  @IsInt()
  driverId: number;

  @IsOptional()
  @IsDate()
  fillDate: Date;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  odometerReading: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  comments?: string;
}