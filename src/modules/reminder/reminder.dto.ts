import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReminderDto {
  @ApiProperty({ example: '2025-05-01T10:00:00Z', description: 'Date and time for the reminder' })
  @IsDateString()
  reminderDate: string;

  @ApiPropertyOptional({ example: 'Reminder for vehicle service', description: 'Reminder message' })
  @IsString()
  message?: string;

  @ApiProperty({ example: 3, description: 'ID of the vehicle associated with the reminder' })
  @IsInt()
  vehicleId: number;
}

export class UpdateReminderDto {
  @ApiPropertyOptional({ example: '2025-05-02T10:00:00Z', description: 'Updated date and time for the reminder' })
  @IsOptional()
  @IsDateString()
  reminderDate: string;

  @ApiPropertyOptional({ example: 'Updated reminder message', description: 'Updated message for the reminder' })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({ example: 5, description: 'Updated vehicle ID for the reminder' })
  @IsOptional()
  @IsInt()
  vehicleId?: number;
}
