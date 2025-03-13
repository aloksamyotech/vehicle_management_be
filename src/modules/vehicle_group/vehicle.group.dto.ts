import { IsString, IsOptional, IsBoolean , IsNotEmpty} from 'class-validator';

export class CreateVehicleGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateVehicleGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
