import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateUserFeaturePermissionDto } from './user.management.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class UserManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async addUserFeaturePermission(
    userFeaturePermissionData: CreateUserFeaturePermissionDto,
  ) {
    const { userId, permissions } = userFeaturePermissionData;

    try {
      await this.prisma.userFeaturePermission.deleteMany({
        where: { userId },
      });

      const featurePermission = permissions.map((item) => ({
        userId,
        featureId: item.featureId,
        permissionId: item.permissionId,
      }));

      return await this.prisma.userFeaturePermission.createMany({
        data: featurePermission,
        skipDuplicates: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getUserPermissions(userId: any) {
    try {
      const permissions = await this.prisma.userFeaturePermission.findMany({
        where: {
          userId: userId,
        },
        include: {
          feature: true,
          permission: true,
        },
      });
      return permissions;
    } catch (error) {
      throw new InternalServerErrorException(messages.data_not_found);
    }
  }
}
