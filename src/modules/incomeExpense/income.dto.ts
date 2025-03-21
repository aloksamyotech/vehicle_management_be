import { IsInt, IsOptional, IsString, IsDate, IsBoolean, IsNumber } from 'class-validator';

export class CreateIncomeExpenseDto {
  @IsInt()
  vehicleId: number;

  @IsDate()
  date: Date;

  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateIncomeExpenseDto {
  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

