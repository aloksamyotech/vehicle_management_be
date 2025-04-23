import { IsInt, IsOptional, IsPositive, IsDateString, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFuelDto {
  @ApiProperty({ example: 1, description: 'ID of the vehicle' })
  @IsInt()
  vehicleId: number;

  @ApiProperty({ example: 2, description: 'ID of the driver' })
  @IsInt()
  driverId: number;

  @ApiProperty({ example: '2025-04-22T14:30:00Z', description: 'Date of fuel fill' })
  @IsDateString()
  fillDate: string;

  @ApiProperty({ example: 50, description: 'Quantity of fuel filled in liters' })
  @IsPositive()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 120000, description: 'Odometer reading at the time of fuel fill' })
  @IsInt()
  @IsPositive()
  odometerReading: number;

  @ApiProperty({ example: 4000, description: 'Amount spent on fuel' })
  @IsPositive()
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: 'Fuelled at HP Petrol Pump', description: 'Optional comments' })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ example: true, description: 'Whether to add this entry to expenses' })
  @IsBoolean()
  addToExpense: boolean;
}

export class UpdateFuelDto {
  @ApiPropertyOptional({ example: 1, description: 'Updated vehicle ID' })
  @IsOptional()
  @IsInt()
  vehicleId: number;

  @ApiPropertyOptional({ example: 2, description: 'Updated driver ID' })
  @IsOptional()
  @IsInt()
  driverId: number;

  @ApiPropertyOptional({ example: '2025-04-23T10:00:00Z', description: 'Updated fill date' })
  @IsOptional()
  @IsDateString()
  fillDate: string;

  @ApiPropertyOptional({ example: 45, description: 'Updated fuel quantity' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({ example: 121000, description: 'Updated odometer reading' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  odometerReading: number;

  @ApiPropertyOptional({ example: 3800, description: 'Updated fuel amount' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: 'Refueled after long route', description: 'Updated comments' })
  @IsOptional()
  @IsString()
  comments?: string;
}
