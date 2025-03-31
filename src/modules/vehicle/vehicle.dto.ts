import {
    IsString,
    IsBoolean,
    IsOptional,
    IsInt,
    IsDateString,
    IsNotEmpty,
  } from 'class-validator';
  
  export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    registrationNo: string;
  
    @IsString()
    @IsNotEmpty()
    vehicleName: string;
  
    @IsString()
    @IsNotEmpty()
    model: string;
  
    @IsString()
    @IsNotEmpty()
    chasisNo: string;
  
    @IsString()
    @IsNotEmpty()
    engineNo: string;
  
    @IsString()
    @IsNotEmpty()
    manufacturedBy: string;
  
    @IsOptional()
    @IsString()
    vehicleColor?: string;
  
    @IsNotEmpty()
    @IsDateString()
    registrationExpiry: string;
  
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @IsOptional()
    @IsString()
    image?: string;
  
    @IsOptional()
    @IsString()
    doc?: string;
  
    @IsInt()
    @IsNotEmpty()
    vehicleGroupId: number;
  }
export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  registrationNo?: string;

  @IsOptional()
  @IsString()
  vehicleName?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  chasisNo?: string;

  @IsOptional()
  @IsString()
  engineNo?: string;

  @IsOptional()
  @IsString()
  manufacturedBy?: string;

  @IsOptional()
  @IsString()
  vehicleColor?: string;

  @IsOptional()
  @IsDateString()
  registrationExpiry?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  doc?: string;

  @IsOptional()
  @IsInt()
  vehicleGroupId?: number; 
}
