import { IsInt, IsOptional, IsString, IsDateString} from 'class-validator';

export class CreateReminderDto {
  @IsDateString()
  reminderDate: string;

  @IsString()
  message?: string;

  @IsInt()
  vehicleId: number;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsDateString()
  reminderDate: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsInt()
  vehicleId?: number; 
}
