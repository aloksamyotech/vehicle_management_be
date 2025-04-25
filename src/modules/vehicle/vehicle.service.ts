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

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const monthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const monthEnd = new Date();
    monthEnd.setHours(23, 59, 59, 999);

    const [vehicles, total, totalThisMonth] = await this.prisma.$transaction([
      this.prisma.vehicle.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          vehicleGroup: true,
        },
      }),
      this.prisma.vehicle.count({
        where: { isDeleted: false },
      }),
      this.prisma.vehicle.count({
        where: {
          isDeleted: false,
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ]);

    const BASE_URL = 'http://localhost:7600';

    const data = vehicles.map((vehicle) => ({
      ...vehicle,
      imageUrl: vehicle.image
        ? `${BASE_URL}/file/stream/${vehicle.image.split('/').pop()}`
        : null,
      docUrl: vehicle.doc
        ? `${BASE_URL}/file/stream/${vehicle.doc.split('/').pop()}`
        : null,
    }));

    return {
      vehicleDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
      totalMonthlyVehicles: totalThisMonth,
    };
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
      bookingsCount: result.bookings?.length || 0,
    };
  }

async updateVehicle(id: number, updateVehicleDto: UpdateVehicleDto) {
  try {
    if (updateVehicleDto.registrationNo || updateVehicleDto.chasisNo || updateVehicleDto.engineNo) {
      const existingVehicles = await this.prisma.vehicle.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            { isDeleted: false },
            {
              OR: [
                ...(updateVehicleDto.registrationNo ? [{ registrationNo: updateVehicleDto.registrationNo }] : []),
                ...(updateVehicleDto.chasisNo ? [{ chasisNo: updateVehicleDto.chasisNo }] : []),
                ...(updateVehicleDto.engineNo ? [{ engineNo: updateVehicleDto.engineNo }] : []),
              ],
            },
          ],
        },
      });

      if (existingVehicles) {
        const duplicateFields: string[] = [];
        if (existingVehicles.registrationNo === updateVehicleDto.registrationNo) {
          duplicateFields.push('Registration Number');
        }
        if (existingVehicles.chasisNo === updateVehicleDto.chasisNo) {
          duplicateFields.push('Chassis Number');
        }
        if (existingVehicles.engineNo === updateVehicleDto.engineNo) {
          duplicateFields.push('Engine Number');
        }
        throw new ConflictException(`Already exist: ${duplicateFields.join(', ')}.`);
      }
    }

    const updateData = {
      ...updateVehicleDto,
      isActive: updateVehicleDto.isActive !== undefined ? String(updateVehicleDto.isActive) === 'true' : undefined,
      vehicleGroupId: updateVehicleDto.vehicleGroupId ? Number(updateVehicleDto.vehicleGroupId) : undefined,
      registrationExpiry: updateVehicleDto.registrationExpiry ? new Date(updateVehicleDto.registrationExpiry) : undefined,
    };

    return await this.prisma.vehicle.update({
      where: { id },
      data: updateData,
      include: { vehicleGroup: true },
    });
  } catch (error) {
    if (error instanceof ConflictException) {
      throw error;
    }
    throw new InternalServerErrorException(messages.data_update_failed);
  }
}

  async removeVehicle(id: number) {
    return await this.prisma.vehicle.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
