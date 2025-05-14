import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DriverLoginDto {
  @ApiProperty({
    example: '9876543210',
    description: 'Mobile number of the driver used for login',
  })
  @IsNotEmpty()
  @IsString()
  mobileNo: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the driver account',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
