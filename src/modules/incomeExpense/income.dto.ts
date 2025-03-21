import { IsInt, IsOptional, IsString, IsDateString, IsPositive, IsNumber } from 'class-validator';
export class CreateIncomeExpenseDto {
  @IsInt()
  vehicleId: number;

  @IsDateString()
  date: string;

  @IsString()
  type: string;

  @IsPositive()
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
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

