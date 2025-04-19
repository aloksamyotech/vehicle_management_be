import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PermissionItemDto {
  @ApiProperty({ example: 1, description: 'ID of the feature' })
  @IsInt()
  featureId: number;

  @ApiProperty({ example: 2, description: 'ID of the permission' })
  @IsInt()
  permissionId: number;
}

export class CreateUserFeaturePermissionDto {
  @ApiProperty({ example: 1, description: 'ID of the user' })
  @IsInt()
  userId: number;

  @ApiProperty({
    type: [PermissionItemDto],
    description: 'Array of permission-feature mappings',
    example: [
      { featureId: 10, permissionId: 1 },
      { featureId: 11, permissionId: 2 }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PermissionItemDto)
  permissions: PermissionItemDto[];
}
