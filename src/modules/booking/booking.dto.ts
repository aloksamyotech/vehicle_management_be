import {
  IsInt,
  IsOptional,
  IsPositive,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 1, description: 'ID of the customer' })
  @IsInt()
  customerId: number;

  @ApiProperty({ example: 101, description: 'ID of the vehicle' })
  @IsInt()
  vehicleId: number;

  @ApiProperty({ example: 202, description: 'ID of the driver (optional)', required: false })
  @IsOptional()
  @IsInt()
  driverId: number;

  @ApiProperty({ example: 'one-way', description: 'Type of the trip' })
  @IsString()
  tripType: string;

  @ApiProperty({ example: '2025-04-15T10:00:00Z', description: 'Trip start datetime (ISO format)' })
  @IsDateString()
  tripStartDate: string;

  @ApiProperty({ example: '2025-04-17T18:00:00Z', description: 'Trip end datetime (ISO format)' })
  @IsDateString()
  tripEndDate: string;

  @ApiProperty({ example: 'Delhi', description: 'Starting location of the trip' })
  @IsString()
  tripStartLoc: string;

  @ApiProperty({ example: 'Mumbai', description: 'Ending location of the trip' })
  @IsString()
  tripEndLoc: string;

  @ApiProperty({ example: '110001', description: 'Pincode of the starting location' })
  @IsString()
  tripStartPincode: string;

  @ApiProperty({ example: '400001', description: 'Pincode of the ending location' })
  @IsString()
  tripEndPincode: string;

  @ApiProperty({ example: 1500.5, description: 'Total kilometers for the trip' })
  @IsPositive()
  @IsNumber()
  totalKm: number;

  @ApiProperty({ example: 7800, description: 'Total amount for the trip' })
  @IsPositive()
  @IsNumber()
  totalAmt: number;

  @ApiProperty({ example: 'pending', description: 'Status of the trip' })
  @IsString()
  tripStatus: string;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ example: 2, description: 'Updated customer ID' })
  @IsOptional()
  @IsInt()
  customerId?: number;

  @ApiPropertyOptional({ example: 102, description: 'Updated vehicle ID' })
  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @ApiPropertyOptional({ example: 203, description: 'Updated driver ID' })
  @IsOptional()
  @IsInt()
  driverId?: number;

  @ApiPropertyOptional({ example: 'round-trip', description: 'Updated trip type' })
  @IsOptional()
  @IsString()
  tripType?: string;

  @ApiPropertyOptional({ example: '2025-04-16T08:00:00Z', description: 'Updated start date/time' })
  @IsOptional()
  @IsDateString()
  tripStartDate?: string;

  @ApiPropertyOptional({ example: '2025-04-18T20:00:00Z', description: 'Updated end date/time' })
  @IsOptional()
  @IsDateString()
  tripEndDate?: string;

  @ApiPropertyOptional({ example: 'Bangalore', description: 'Updated starting location' })
  @IsOptional()
  @IsString()
  tripStartLoc?: string;

  @ApiPropertyOptional({ example: 'Hyderabad', description: 'Updated ending location' })
  @IsOptional()
  @IsString()
  tripEndLoc?: string;

  @ApiPropertyOptional({ example: '560001', description: 'Updated starting pincode' })
  @IsOptional()
  @IsString()
  tripStartPincode?: string;

  @ApiPropertyOptional({ example: '500001', description: 'Updated ending pincode' })
  @IsOptional()
  @IsString()
  tripEndPincode?: string;

  @ApiPropertyOptional({ example: 1000.75, description: 'Updated total kilometers' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  totalKm?: number;

  @ApiPropertyOptional({ example: 6500, description: 'Updated total amount' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  totalAmt?: number;

  @ApiPropertyOptional({ example: 'completed', description: 'Updated trip status' })
  @IsOptional()
  @IsString()
  tripStatus?: string;
}

export class UpdateBookingStatusDto {
  @ApiProperty({ example: 'cancelled', description: 'New status for the trip' })
  @IsString()
  tripStatus: string;
}
