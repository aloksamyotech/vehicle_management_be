import { IsInt, IsOptional, IsString, IsDate, IsBoolean, IsPositive, IsNumber } from 'class-validator';

export class CreateMaintenanceDto {
  @IsInt()
  vehicleId: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsString()
  details?: string;

  @IsPositive()
  @IsNumber()
  totalCost: number;

  @IsString()
  vendorName: string;

  @IsInt()
  partsInventoryId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString()
  status: string;
}

export class UpdateMaintenanceDto {
  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  totalCost?: number;

  @IsOptional()
  @IsString()
  vendorName?: string;

  @IsOptional()
  @IsInt()
  partsInventoryId?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
