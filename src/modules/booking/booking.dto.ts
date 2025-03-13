import { 
  IsInt, 
  IsOptional, 
  IsPositive, 
  IsDate, 
  IsNumber, 
  IsString 
} from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  customerId: number;

  @IsInt()
  vehicleId: number;

  @IsInt()
  driverId: number;

  @IsString()
  tripType: string;

  @IsDate()
  tripStartDate: Date;

  @IsDate()
  tripEndDate: Date;

  @IsString()
  tripStartLoc: string;

  @IsString()
  tripEndLoc: string;

  @IsPositive()
  @IsNumber()
  totalKm: number;

  @IsPositive()
  @IsNumber()
  totalAmt: number;

  @IsString()
  tripStatus: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsInt()
  customerId?: number;

  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @IsOptional()
  @IsInt()
  driverId?: number;

  @IsOptional()
  @IsString()
  tripType?: string;

  @IsOptional()
  @IsDate()
  tripStartDate?: Date;

  @IsOptional()
  @IsDate()
  tripEndDate?: Date;

  @IsOptional()
  @IsString()
  tripStartLoc?: string;

  @IsOptional()
  @IsString()
  tripEndLoc?: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  totalKm?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  totalAmt?: number;

  @IsOptional()
  @IsString()
  tripStatus?: string;
}
