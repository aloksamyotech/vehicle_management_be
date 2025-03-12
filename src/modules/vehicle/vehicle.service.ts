import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.vehicle.findMany({
      where: { isDeleted: false },
      include: {
        vehicleGroup: true,
      },
    });
  }

  async createVehicle(vehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: vehicleDto,
    });
  }

  async getById(id: number) {
    const result = await this.prisma.vehicle.findUnique({
      where: { id, isDeleted: false },
      include: {
        vehicleGroup: true,
      },
    });
    if (!result) {
      throw new NotFoundException(`Vehicle with ID ${id} not found.`);
    }
    return result;
  }

  async updateVehicle(id: number, updateVehicleDto: UpdateVehicleDto) {
    const existingVehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });
    if (!existingVehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return await this.prisma.vehicle.update({
      where: { id },
      data: {
        ...updateVehicleDto,
        vehicleGroupId:
          updateVehicleDto.vehicleGroupId ?? existingVehicle.vehicleGroupId,
      },
      include: { vehicleGroup: true },
    });
  }

  async removeVehicle(id: number) {
    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete vehicle.');
    }
  }
}
