import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  MinLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '123 Main St, City, Country', description: 'User address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'SecurePassword123!', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'randomIVstring', description: 'Initialization vector for encryption' })
  @IsString()
  iv: string;

  @ApiPropertyOptional({ example: true, description: 'Is the user active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateUserStatusDto {
  @ApiPropertyOptional({ example: false, description: 'Updated status of the user' })
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'user@example.com', description: 'Updated email address of the user' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'Updated full name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '123 Main St, City, Country', description: 'Updated address of the user' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'NewSecurePassword456!', description: 'Updated password of the user' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Updated phone number of the user' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'randomIVstring', description: 'Updated initialization vector for encryption' })
  @IsOptional()
  @IsString()
  iv?: string;

  @ApiPropertyOptional({ example: true, description: 'Updated status of the user' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCurrencyDto {
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  @IsString()
  currencyCode: string;

  @ApiProperty({ example: '$', description: 'Currency symbol' })
  @IsString()
  currencySymbol: string;
}
export class ChangePasswordDto {
  @ApiProperty({
    example: 'OldPass123!',
    description: 'The current password of the user',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'NewPass456!',
    description: 'The new password to be set. Must be at least 6 characters long.',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}