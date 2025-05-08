import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TripCheckpointDto {
  @ApiProperty({
    example: 'Delhi',
    description: 'City name for the checkpoint',
  })
  @IsString()
  cityName: string;

  @ApiPropertyOptional({
    example: 'https://maps.google.com/?q=Delhi',
    description: 'Google Maps URL for the checkpoint location',
  })
  @IsString()
  @IsOptional()
  locationUrl?: string;

  @ApiProperty({
    example: true,
    description: 'Whether the checkpoint is active or not',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'Optional order of the checkpoint (auto-handled if omitted)',
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    example: 3,
    description: 'ID of the booking associated with the checkpoint',
  })
  @IsInt()
  bookingId: number;
}

export class CreateBookingWithCheckpointsDto {
  @ApiProperty({
    type: [TripCheckpointDto],
    description: 'List of checkpoints to be added for a booking',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TripCheckpointDto)
  checkpoints: TripCheckpointDto[];
}

export class UpdateCheckpointDto {
  @ApiPropertyOptional({
    description: 'URL for the checkpoint location (Optional)',
    example: 'https://maps.google.com/?q=NewLocation',
  })
  @IsOptional()
  @IsString()
  locationUrl?: string;

  @ApiPropertyOptional({
    description: 'Indicates whether the checkpoint is active or not (Optional)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
