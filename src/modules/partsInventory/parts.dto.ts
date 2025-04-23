import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomStatus } from '@prisma/client';

export class CreatePartsDto {
  @ApiProperty({ example: 'Brake Pad', description: 'Name of the part' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Front disc brake pad', description: 'Optional description of the part' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 50, description: 'Available stock quantity of the part' })
  @IsInt()
  stock: number;

  @ApiPropertyOptional({
    enum: CustomStatus,
    description: 'Status of the part (e.g., Active, Inactive)',
  })
  @IsEnum(CustomStatus)
  @IsOptional()
  status?: CustomStatus;
}

export class UpdatePartsDto {
  @ApiPropertyOptional({ example: 'Brake Pad', description: 'Name of the part' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Front disc brake pad', description: 'Description of the part' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 45, description: 'Updated stock quantity of the part' })
  @IsOptional()
  @IsInt()
  stock?: number;

  @ApiPropertyOptional({
    enum: CustomStatus,
    description: 'Updated status of the part (e.g., Active, Inactive)',
  })
  @IsOptional()
  @IsEnum(CustomStatus)
  status?: CustomStatus;
}
