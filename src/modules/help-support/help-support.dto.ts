import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHelpSupportDto {
  @ApiProperty({
    example: 123,
    description: 'ID of the driver to which the support is related',
  })
  @IsInt()
  driverId: number;

  @ApiProperty({
    example: 'Issue with login',
    description: 'Short subject line describing the issue',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    example: 'I am unable to log in with my credentials. Please assist.',
    description: 'Detailed description of the issue',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
