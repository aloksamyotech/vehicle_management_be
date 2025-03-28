import { 
  IsInt, 
  IsOptional, 
  IsPositive, 
  IsDateString, 
  IsNumber, 
  IsString 
} from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  customerId: number;

  @IsInt()
  vehicleId: number;

  @IsOptional()
  @IsInt()
  driverId: number;

  @IsString()
  tripType: string;

  @IsDateString()
  tripStartDate: string;

  @IsDateString()
  tripEndDate: string;

  @IsString()
  tripStartLoc: string;

  @IsString()
  tripEndLoc: string;

  @IsString()
  tripStartPincode: string;

  @IsString()
  tripEndPincode: string;

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
  @IsDateString()
  tripStartDate?: string;

  @IsOptional()
  @IsDateString()
  tripEndDate?: string;

  @IsOptional()
  @IsString()
  tripStartLoc?: string;

  @IsOptional()
  @IsString()
  tripEndLoc?: string;

  @IsOptional()
  @IsString()
  tripStartPincode: string;
  
  @IsOptional()
  @IsString()
  tripEndPincode: string;

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
