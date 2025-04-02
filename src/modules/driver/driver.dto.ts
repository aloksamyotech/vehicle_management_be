import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsEmail,
} from 'class-validator';
import { CustomStatus } from '@prisma/client';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  mobileNo: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  age: number;

  @IsString()
  address: string;

  @IsString()
  licenseNo: string;

  @IsDateString()
  licenseExpiry: string;

  @IsDateString()
  dateOfJoining: string;

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

export class UpdateStatusDto {
  @IsEnum(CustomStatus)
  @IsNotEmpty()
  status: CustomStatus;
}
export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  mobileNo?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

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
  @IsDateString()
  licenseExpiry?: string;

  @IsOptional()
  @IsDateString()
  dateOfJoining?: string;

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
