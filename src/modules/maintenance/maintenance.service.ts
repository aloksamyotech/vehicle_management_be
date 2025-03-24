import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import {
  CreateMaintenanceDto,
  UpdateMaintenanceStatusDto,
} from './maintenance.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.maintenance.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' } ,
      include: {
        vehicle: true,
        parts: {
          include: { partsInventory: true },
        },
      },
    });
  }

  async getById(id: number) {
    const result = await this.prisma.maintenance.findUnique({
      where: { id },
      include: {
        vehicle: true,
        parts: {
          include: { partsInventory: true },
        },
      },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

  async createMaintenance(createdto: CreateMaintenanceDto) {
    return this.prisma.maintenance.create({
      data: {
        vehicleId: createdto.vehicleId,
        startDate: createdto.startDate,
        endDate: createdto.endDate,
        details: createdto.details,
        totalCost: createdto.totalCost,
        vendorName: createdto.vendorName,
        status: createdto.status,
        parts: {
          create: createdto?.parts?.map((part) => ({
            partsInventoryId: part.partsInventoryId,
            quantity: part.quantity,
          })),
        },
      },
      include: { parts: true },
    });
  }

  async updateStatus(id: number, statusDto: UpdateMaintenanceStatusDto) {
    const { status } = statusDto;
    await this.prisma.maintenance.findUnique({ where: { id } });
    return await this.prisma.maintenance.update({
      where: { id },
      data: { status },
    });
  }

  async removeMaintenance(id: number) {
    try {
      return await this.prisma.maintenance.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }
}
