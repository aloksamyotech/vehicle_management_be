import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { messages } from 'src/common/constant';
@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.vehicle.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        vehicleGroup: true,
      },
    });
  }

  async createVehicle(vehicleDto: CreateVehicleDto) {
    try {
      const existingVehicles = await this.prisma.vehicle.findMany({
        where: {
          OR: [
            { registrationNo: vehicleDto.registrationNo },
            { chasisNo: vehicleDto.chasisNo },
            { engineNo: vehicleDto.engineNo },
          ],
        },
      });

      let duplicateFields: string[] = [];

      existingVehicles.forEach((existingVehicle) => {
        if (existingVehicle.registrationNo === vehicleDto.registrationNo) {
          duplicateFields.push('Registration Number');
        }
        if (existingVehicle.chasisNo === vehicleDto.chasisNo) {
          duplicateFields.push('Chassis Number');
        }
        if (existingVehicle.engineNo === vehicleDto.engineNo) {
          duplicateFields.push('Engine Number');
        }
      });

      if (duplicateFields.length > 0) {
        const errorMessage = `Already exist: ${duplicateFields.join(', ')}.`;
        throw new ConflictException(errorMessage);
      }

      return await this.prisma.vehicle.create({
        data: vehicleDto,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getById(id: number) {
    const result = await this.prisma.vehicle.findUnique({
      where: { id, isDeleted: false },
      include: {
        vehicleGroup: true,
      },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

  async updateVehicle(id: number, updateVehicleDto: UpdateVehicleDto) {
    const existingVehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });
    if (!existingVehicle) {
      throw new NotFoundException(messages.data_not_found);
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
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }
}
