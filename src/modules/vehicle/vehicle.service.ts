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
    const vehicles = await this.prisma.vehicle.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        vehicleGroup: true,
      },
    });

    const BASE_URL = 'http://localhost:7600';

    return vehicles.map((vehicle) => ({
      ...vehicle,
      imageUrl: vehicle.image
        ? `${BASE_URL}/file/stream/${vehicle.image.split('/').pop()}`
        : null,
      docUrl: vehicle.doc
        ? `${BASE_URL}/file/stream/${vehicle.doc.split('/').pop()}`
        : null,
    }));
  }

  async createVehicle(
    vehicleDto: CreateVehicleDto & { image?: string; doc?: string },
  ) {
    try {
      const existingVehicles = await this.prisma.vehicle.findMany({
        where: {
          OR: [
            { vehicleName: vehicleDto.vehicleName },
            { registrationNo: vehicleDto.registrationNo },
            { chasisNo: vehicleDto.chasisNo },
            { engineNo: vehicleDto.engineNo },
          ],
        },
      });

      let duplicateFields: string[] = [];

      existingVehicles.forEach((existingVehicle) => {
        if (existingVehicle.vehicleName === vehicleDto.vehicleName) {
          duplicateFields.push('Vehicle Name');
        }
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
        data: {
          registrationNo: vehicleDto.registrationNo,
          vehicleName: vehicleDto.vehicleName,
          model: vehicleDto.model,
          chasisNo: vehicleDto.chasisNo,
          engineNo: vehicleDto.engineNo,
          manufacturedBy: vehicleDto.manufacturedBy,
          registrationExpiry: new Date(vehicleDto.registrationExpiry),
          vehicleColor: vehicleDto.vehicleColor,
          image: vehicleDto.image,
          doc: vehicleDto.doc,
          vehicleGroupId: Number(vehicleDto.vehicleGroupId),
        },
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
        bookings: {
          where: { isDeleted: false },
          include: {
            driver: {
              select: { name: true },
            },
            customer: {
              select: { name: true },
            },
          },
        },
        incomeExpense: {
          where: { isDeleted: false },
        },
      },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    const BASE_URL = 'http://localhost:7600';

    return {
      ...result,
      imageUrl: result.image
        ? `${BASE_URL}/file/stream/${result.image.split(/[\\/]/).pop()}`
        : null,
      docUrl: result.doc
        ? `${BASE_URL}/file/stream/${result.doc.split('/').pop()}`
        : null,
    };
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
    return await this.prisma.vehicle.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
