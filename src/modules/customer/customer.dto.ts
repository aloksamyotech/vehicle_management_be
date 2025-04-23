import { IsString, IsBoolean, IsNotEmpty, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomStatus } from '@prisma/client';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the customer',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '9876543210',
    description: 'Mobile number of the customer',
  })
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the customer',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123 MG Road, Bangalore',
    description: 'Residential address of the customer',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}

export class UpdateCustomerDto {
  @ApiPropertyOptional({
    example: 'Jane Smith',
    description: 'Updated name of the customer',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '9123456789',
    description: 'Updated mobile number',
  })
  @IsOptional()
  @IsString()
  mobileNo?: string;

  @ApiPropertyOptional({
    example: 'jane.smith@example.com',
    description: 'Updated email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '456 Residency Road, Mumbai',
    description: 'Updated address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    enum: CustomStatus,
    description: 'Updated status of the customer',
    example: CustomStatus.Active,
  })
  @IsOptional()
  @IsEnum(CustomStatus)
  status?: CustomStatus;
}
