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

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.maintenance.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          vehicle: true,
          parts: {
            include: { partsInventory: true },
          },
        },
      }),
      this.prisma.maintenance.count({
        where: { isDeleted: false },
      }),
    ]);

    return {
      mainDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
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
    return this.prisma.$transaction(async (prisma) => {
      const maintenance = await prisma.maintenance.create({
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

      for (const part of createdto.parts) {
        const partInventory = await prisma.partsInventory.findUnique({
          where: { id: part.partsInventoryId },
        });

        if (!partInventory || partInventory.stock < part.quantity) {
          throw new Error(messages.data_unavailable);
        }

        await prisma.partsInventory.update({
          where: { id: part.partsInventoryId },
          data: {
            stock: {
              decrement: part.quantity,
            },
          },
        });
      }
      return maintenance;
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
    return await this.prisma.maintenance.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
