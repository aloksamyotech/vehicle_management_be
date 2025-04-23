import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'ABC1234', description: 'Vehicle registration number' })
  @IsString()
  @IsNotEmpty()
  registrationNo: string;

  @ApiProperty({ example: 'Toyota Corolla', description: 'Vehicle name' })
  @IsString()
  @IsNotEmpty()
  vehicleName: string;

  @ApiProperty({ example: '2021', description: 'Vehicle model' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'X1234567890', description: 'Vehicle chassis number' })
  @IsString()
  @IsNotEmpty()
  chasisNo: string;

  @ApiProperty({ example: 'EN987654321', description: 'Vehicle engine number' })
  @IsString()
  @IsNotEmpty()
  engineNo: string;

  @ApiProperty({ example: 'Toyota', description: 'Manufacturer of the vehicle' })
  @IsString()
  @IsNotEmpty()
  manufacturedBy: string;

  @ApiPropertyOptional({ example: 'Red', description: 'Vehicle color' })
  @IsOptional()
  @IsString()
  vehicleColor?: string;

  @ApiProperty({ example: '2023-12-31', description: 'Vehicle registration expiry date' })
  @IsNotEmpty()
  @IsDateString()
  registrationExpiry: string;

  @ApiPropertyOptional({ example: true, description: 'Is the vehicle active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'vehicle-image.jpg', description: 'Vehicle image' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'vehicle-doc.pdf', description: 'Vehicle document' })
  @IsOptional()
  @IsString()
  doc?: string;

  @ApiProperty({ example: 1, description: 'Vehicle group ID' })
  @IsInt()
  @IsNotEmpty()
  vehicleGroupId: number;
}

export class UpdateVehicleDto {
  @ApiPropertyOptional({ example: 'XYZ9876', description: 'Updated vehicle registration number' })
  @IsOptional()
  @IsString()
  registrationNo?: string;

  @ApiPropertyOptional({ example: 'Honda Civic', description: 'Updated vehicle name' })
  @IsOptional()
  @IsString()
  vehicleName?: string;

  @ApiPropertyOptional({ example: '2022', description: 'Updated vehicle model' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 'Y9876543210', description: 'Updated vehicle chassis number' })
  @IsOptional()
  @IsString()
  chasisNo?: string;

  @ApiPropertyOptional({ example: 'EN123456789', description: 'Updated vehicle engine number' })
  @IsOptional()
  @IsString()
  engineNo?: string;

  @ApiPropertyOptional({ example: 'Honda', description: 'Updated vehicle manufacturer' })
  @IsOptional()
  @IsString()
  manufacturedBy?: string;

  @ApiPropertyOptional({ example: 'Blue', description: 'Updated vehicle color' })
  @IsOptional()
  @IsString()
  vehicleColor?: string;

  @ApiPropertyOptional({ example: '2024-12-31', description: 'Updated vehicle registration expiry date' })
  @IsOptional()
  @IsDateString()
  registrationExpiry?: string;

  @ApiPropertyOptional({ example: false, description: 'Updated vehicle active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'updated-vehicle-image.jpg', description: 'Updated vehicle image' })
  @IsOptional()
  @IsString()
  image?: string | null;

  @ApiPropertyOptional({ example: 'updated-vehicle-doc.pdf', description: 'Updated vehicle document' })
  @IsOptional()
  @IsString()
  doc?: string | null;

  @ApiPropertyOptional({ example: 2, description: 'Updated vehicle group ID' })
  @IsOptional()
  @IsInt()
  vehicleGroupId?: number;
}
