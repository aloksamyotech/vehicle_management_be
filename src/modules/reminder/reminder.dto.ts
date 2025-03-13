import { IsInt, IsOptional, IsString, IsDate , IsBoolean} from 'class-validator';

export class CreateReminderDto {
  @IsDate()
  reminderDate: Date;

  @IsString()
  message?: string;

  @IsInt()
  vehicleId: number;
}

export class UpdateReminderDto {
  @IsOptional()
  @IsDate()
  reminderDate: Date;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsInt()
  vehicleId?: number; 
}
