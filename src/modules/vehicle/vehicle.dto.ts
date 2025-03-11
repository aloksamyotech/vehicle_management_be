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
  