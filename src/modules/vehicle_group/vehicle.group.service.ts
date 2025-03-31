import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import {
  CreateVehicleGroupDto,
  UpdateVehicleGroupDto,
} from './vehicle.group.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class VehicleGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.vehicleGroup.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(groupData: CreateVehicleGroupDto) {
    try {
      const existingGroup = await this.prisma.vehicleGroup.findUnique({
        where: { name: groupData.name },
      });

      if (existingGroup) {
        throw new ConflictException(messages.data_already_exists);
      }
      return await this.prisma.vehicleGroup.create({
        data: groupData,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
       messages.data_add_failed
      );
    }
  }

  async getGroupById(id: number) {
    const group = await this.prisma.vehicleGroup.findFirst({
      where: { id, isDeleted: false },
    });
    if (!group) {
      throw new NotFoundException(messages.data_not_found);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateVehicleGroupDto) {
      return await this.prisma.vehicleGroup.update({
        where: { id },
        data: updateGroupDto,
      });
  }

  async removeGroup(id: number) {
      return await this.prisma.vehicleGroup.update({
        where: { id },
        data: { isDeleted: true },
      });
  }
}
