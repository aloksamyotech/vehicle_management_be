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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PartsDto {
  @ApiProperty({ example: 1, description: 'ID of the part in inventory' })
  @IsInt()
  partsInventoryId: number;

  @ApiProperty({ example: 2, description: 'Quantity of this part used in maintenance' })
  @IsInt()
  @IsPositive()
  quantity: number;
}

export class CreateMaintenanceDto {
  @ApiProperty({ example: 101, description: 'ID of the vehicle being maintained' })
  @IsInt()
  vehicleId: number;

  @ApiProperty({ example: '2025-04-20', description: 'Start date of the maintenance' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-04-22', description: 'End date of the maintenance' })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ example: 'Brake pad replacement and oil change', description: 'Optional maintenance details' })
  @IsOptional()
  @IsString()
  details?: string;

  @ApiProperty({ example: 3500.50, description: 'Total cost incurred for the maintenance' })
  @IsPositive()
  @IsNumber()
  totalCost: number;

  @ApiProperty({ example: 'AutoFix Garage', description: 'Name of the vendor who performed the maintenance' })
  @IsString()
  vendorName: string;

  @ApiProperty({
    type: [PartsDto],
    description: 'List of parts used in the maintenance',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartsDto)
  parts: PartsDto[];

  @ApiProperty({ example: 'Completed', description: 'Status of the maintenance (e.g., pending, in-progress, completed)' })
  @IsString()
  status: string;
}

export class UpdateMaintenanceStatusDto {
  @ApiProperty({ example: 'Completed', description: 'New status of the maintenance' })
  @IsNotEmpty()
  @IsString()
  status: string;
}
