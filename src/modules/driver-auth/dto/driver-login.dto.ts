import { IsNotEmpty, IsString } from 'class-validator';

export class DriverLoginDto {
  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @IsNotEmpty()
  @IsString()
  password: string;
} 