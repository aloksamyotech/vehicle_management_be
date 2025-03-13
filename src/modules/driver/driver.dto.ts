import { IsInt, IsString, IsBoolean, IsDate, IsOptional, IsEnum } from 'class-validator';
import { CustomStatus } from '@prisma/client'; 

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  mobileNo: string;

  @IsInt()
  age: number;

  @IsString()
  address: string;

  @IsString()
  licenseNo: string;

  @IsDate()
  licenseExpiry: Date;

  @IsDate()
  dateOfJoining: Date;

  @IsInt()
  totalExp: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  doc?: string;

  @IsEnum(CustomStatus)
  @IsOptional()
  status?: CustomStatus; 
}

export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  mobileNo?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  licenseNo?: string;

  @IsOptional()
  @IsDate()
  licenseExpiry?: Date;

  @IsOptional()
  @IsDate()
  dateOfJoining?: Date;

  @IsOptional()
  @IsInt()
  totalExp?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  doc?: string;

  @IsOptional()
  @IsEnum(CustomStatus)
  status?: CustomStatus; 
}
