import { IsInt, IsOptional, IsString, IsDateString, IsPositive, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIncomeExpenseDto {
  @ApiProperty({ example: 1, description: 'ID of the vehicle associated with the income or expense' })
  @IsInt()
  vehicleId: number;

  @ApiProperty({ example: '2025-04-23', description: 'Date of the income or expense entry' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'income', description: 'Type of entry, e.g., "income" or "expense"' })
  @IsString()
  type: string;

  @ApiProperty({ example: 2500, description: 'Amount of income or expense' })
  @IsPositive()
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ example: 'Monthly maintenance', description: 'Optional description for the entry' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateIncomeExpenseDto {
  @ApiPropertyOptional({ example: 1, description: 'Updated vehicle ID' })
  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @ApiPropertyOptional({ example: '2025-04-24', description: 'Updated date of the entry' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: 'expense', description: 'Updated type, e.g., "income" or "expense"' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 3000, description: 'Updated amount' })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ example: 'Updated fuel charges', description: 'Updated description' })
  @IsOptional()
  @IsString()
  description?: string;
}
