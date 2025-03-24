import { IsInt, IsOptional, IsPositive, IsDateString, IsNumber, IsString , IsBoolean} from 'class-validator';
export class CreateFuelDto {
  @IsInt()
  vehicleId: number;

  @IsInt()
  driverId: number;

  @IsDateString()
  fillDate: string;

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

  @IsBoolean()
  addToExpense: boolean; 
}

export class UpdateFuelDto {
  @IsOptional()
  @IsInt()
  vehicleId: number;

  @IsOptional()
  @IsInt()
  driverId: number;

  @IsOptional()
  @IsDateString()
  fillDate: string;

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