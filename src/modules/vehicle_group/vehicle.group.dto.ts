import { IsString, IsOptional, IsBoolean , IsNotEmpty} from 'class-validator';

export class CreateVehicleGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

export class UpdateVehicleGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
