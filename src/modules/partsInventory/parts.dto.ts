import { IsString, IsOptional, IsBoolean , IsNotEmpty , IsEnum , IsInt} from 'class-validator';
import { CustomStatus } from '@prisma/client';

export class CreatePartsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  stock: number;

  @IsEnum(CustomStatus)
  @IsOptional()
  status?: CustomStatus;
}

export class UpdatePartsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsInt()
  stock?: number;

  @IsOptional()
  @IsEnum(CustomStatus)
  status?: CustomStatus; 
}
