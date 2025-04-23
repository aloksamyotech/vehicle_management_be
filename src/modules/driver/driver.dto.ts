import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomStatus } from '@prisma/client';

export class CreateDriverDto {
  @ApiProperty({ example: 'Rahul Sharma', description: 'Full name of the driver' })
  @IsString()
  name: string;

  @ApiProperty({ example: '9876543210', description: 'Mobile number of the driver' })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty({ example: 35, description: 'Age of the driver' })
  @IsInt()
  age: number;

  @ApiProperty({ example: '123 MG Road, Pune', description: 'Address of the driver' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'DL-0420221234567', description: 'License number of the driver' })
  @IsString()
  licenseNo: string;

  @ApiProperty({ example: '2026-12-31T00:00:00Z', description: 'Expiry date of the license' })
  @IsDateString()
  licenseExpiry: string;

  @ApiProperty({ example: '2023-04-01T00:00:00Z', description: 'Date when the driver joined' })
  @IsDateString()
  dateOfJoining: string;

  @ApiProperty({ example: 10, description: 'Total driving experience in years' })
  @IsInt()
  totalExp: number;

  @ApiPropertyOptional({ example: 'Has experience with long route driving', description: 'Additional notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: 'driver123.jpg', description: 'Profile image file name' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'license123.pdf', description: 'Document file name (license, ID proof, etc.)' })
  @IsOptional()
  @IsString()
  doc?: string;

  @ApiPropertyOptional({
    enum: CustomStatus,
    description: 'Status of the driver',
    example: CustomStatus.Active,
  })
  @IsEnum(CustomStatus)
  @IsOptional()
  status?: CustomStatus;

  @ApiProperty({ example: 'securePass@123', description: 'Password for driver login' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiPropertyOptional({ example: 'b2df428b9929d3ace7c598bbf4e496b2', description: 'Encryption IV for password' })
  @IsOptional()
  @IsString()
  iv: string;
}

export class UpdateDriverDto {
  @ApiPropertyOptional({ example: 'Amit Kumar', description: 'Updated name of the driver' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '9123456789', description: 'Updated mobile number' })
  @IsOptional()
  @IsString()
  mobileNo?: string;

  @ApiPropertyOptional({ example: 40, description: 'Updated age' })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiPropertyOptional({ example: '456 Residency Road, Delhi', description: 'Updated address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'DL-0420237654321', description: 'Updated license number' })
  @IsOptional()
  @IsString()
  licenseNo?: string;

  @ApiPropertyOptional({ example: '2027-01-01T00:00:00Z', description: 'Updated license expiry' })
  @IsOptional()
  @IsDateString()
  licenseExpiry?: string;

  @ApiPropertyOptional({ example: '2022-05-01T00:00:00Z', description: 'Updated date of joining' })
  @IsOptional()
  @IsDateString()
  dateOfJoining?: string;

  @ApiPropertyOptional({ example: 12, description: 'Updated total experience' })
  @IsOptional()
  @IsInt()
  totalExp?: number;

  @ApiPropertyOptional({ example: 'No remarks', description: 'Updated notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: 'driverUpdated.jpg', description: 'Updated image file name' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'licenseUpdated.pdf', description: 'Updated document file name' })
  @IsOptional()
  @IsString()
  doc?: string;

  @ApiPropertyOptional({
    enum: CustomStatus,
    description: 'Updated status',
    example: CustomStatus.Inactive,
  })
  @IsOptional()
  @IsEnum(CustomStatus)
  status?: CustomStatus;

  @ApiPropertyOptional({ example: 'newSecurePass@123', description: 'Updated password' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4e5f6g7h8', description: 'Updated encryption IV' })
  @IsOptional()
  @IsString()
  iv: string;
}

export class UpdateStatusDto {
  @ApiProperty({
    enum: CustomStatus,
    description: 'New status to be updated',
    example: CustomStatus.Inactive,
  })
  @IsEnum(CustomStatus)
  @IsNotEmpty()
  status: CustomStatus;
}
