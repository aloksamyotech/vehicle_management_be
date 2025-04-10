import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateFuelDto, UpdateFuelDto } from './fuel.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class FuelService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.fuel.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: true,
          driver: true,
        },
      }),
      this.prisma.fuel.count(),
    ]);

    return {
      fuelDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
  }

  async getById(id: number) {
    const result = await this.prisma.fuel.findUnique({
      where: { id },
      include: {
        vehicle: true,
        driver: true,
      },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

  async createFuel(createDto: CreateFuelDto) {
    const { addToExpense, ...fuelData } = createDto;

    const fuel = await this.prisma.fuel.create({
      data: fuelData,
    });

    if (addToExpense) {
      await this.prisma.incomeExpense.create({
        data: {
          vehicleId: fuel.vehicleId,
          date: fuel.fillDate,
          type: 'Expense',
          amount: fuel.amount,
          description: fuel.comments,
        },
      });
    }

    return fuel;
  }

  async updateFuel(id: number, updateDto: UpdateFuelDto) {
    const existingFuel = await this.prisma.fuel.findUnique({ where: { id } });
    if (!existingFuel) {
      throw new NotFoundException(messages.data_not_found);
    }

    if (updateDto.vehicleId) {
      const vehicleExists = await this.prisma.vehicle.findUnique({
        where: { id: updateDto.vehicleId },
      });
      if (!vehicleExists) {
        throw new BadRequestException(messages.data_not_found);
      }
    }

    if (updateDto.driverId) {
      const driverExists = await this.prisma.driver.findUnique({
        where: { id: updateDto.driverId },
      });
      if (!driverExists) {
        throw new BadRequestException(messages.data_not_found);
      }
    }

    return await this.prisma.fuel.update({
      where: { id },
      data: {
        vehicleId: updateDto.vehicleId,
        driverId: updateDto.driverId,
        fillDate: updateDto.fillDate,
        quantity: updateDto.quantity,
        odometerReading: updateDto.odometerReading,
        amount: updateDto.amount,
        comments: updateDto.comments,
      },
      include: { vehicle: true, driver: true },
    });
  }

  async removeFuel(id: number) {
    return await this.prisma.fuel.delete({
      where: { id },
    });
  }

  async getVehicleReport(
    vehicleId?: number,
    startDate?: Date,
    endDate?: Date,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const whereCondition: any = {
      vehicleId: vehicleId || undefined,
      fillDate: {
        gte: startDate || undefined,
        lte: endDate || undefined,
      },
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.fuel.findMany({
        where: whereCondition,
        orderBy: { fillDate: 'asc' },
        skip,
        take: limit,
        select: {
          vehicle: { select: { id: true, vehicleName: true } },
          driver: { select: { id: true, name: true } },
          comments: true,
          fillDate: true,
          quantity: true,
          odometerReading: true,
          amount: true,
        },
      }),
      this.prisma.fuel.count({
        where: whereCondition,
      }),
    ]);

    return {
      fuelDetails: data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
