import {
    IsString,
    IsBoolean,
    IsOptional,
    IsInt,
    IsDate,
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
  
    @IsString()
    @IsNotEmpty()
    vehicleType: string;
  
    @IsOptional()
    @IsString()
    vehicleColor?: string;
  
    @IsDate()
    @IsNotEmpty()
    registrationExpiry: Date;
  
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  
    @IsOptional()
    @IsString()
    image?: string;
  
    @IsOptional()
    @IsString()
    doc?: string;
  
    @IsBoolean()
    @IsOptional()
    isDeleted?: boolean;
  
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
  vehicleType?: string;

  @IsOptional()
  @IsString()
  vehicleColor?: string;

  @IsOptional()
  @IsDate()
  registrationExpiry?: Date;

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
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsInt()
  vehicleGroupId?: number; 
}
