import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateUserFeaturePermissionDto } from './user.management.dto';
import { messages } from 'src/common/constant';


@Injectable()
export class UserManagementService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async addUserFeaturePermission(userFeaturePermissionData: CreateUserFeaturePermissionDto) {
        try {
            const featurePermission = userFeaturePermissionData?.permissions?.map((item) => {
                return {
                    userId: userFeaturePermissionData?.userId,
                    permissionId: item.permissionId,
                    featureId: item.featureId,
                }
            })
            return await this.prisma.userFeaturePermission.createMany({ data: featurePermission, skipDuplicates: true, })

        } catch (error) {

            throw new InternalServerErrorException(messages.data_add_failed);

        }


    }


}
