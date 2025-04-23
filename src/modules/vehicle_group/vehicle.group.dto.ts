import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleGroupDto {
  @ApiProperty({ example: 'Sedans', description: 'Name of the vehicle group' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Group for all sedan type vehicles', description: 'Description of the vehicle group' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateVehicleGroupDto {
  @ApiPropertyOptional({ example: 'SUVs', description: 'Updated name of the vehicle group' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Group for all SUV type vehicles', description: 'Updated description of the vehicle group' })
  @IsOptional()
  @IsString()
  description?: string;
}
