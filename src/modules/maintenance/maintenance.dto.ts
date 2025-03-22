import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsPositive,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PartsDto {
  @IsInt()
  partsInventoryId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

export class CreateMaintenanceDto {
  @IsInt()
  vehicleId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsPositive()
  @IsNumber()
  totalCost: number;

  @IsString()
  vendorName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartsDto)
  parts: PartsDto[];

  @IsString()
  status: string;
}

export class UpdateMaintenanceStatusDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}
