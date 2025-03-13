import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,BadRequestException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateMaintenanceDto , UpdateMaintenanceDto} from './maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.maintenance.findMany({
      where: { isDeleted: false }, 
      include: {
        vehicle: true,
        partsInventory : true,
      },
    });
  }

  async getById(id: number) {
    const result = await this.prisma.maintenance.findUnique({
      where: { id },
      include: {
        vehicle: true,
        partsInventory: true,
      },
    });
    if (!result) {
      throw new NotFoundException(`Maintenance with ID ${id} not found.`);
    }
    return result;
  }

   async createMaintenance(createdto: CreateMaintenanceDto) {
      return this.prisma.maintenance.create({
        data: createdto,
      });
    }
  
  async updateMaintenance(id: number, updateDto: UpdateMaintenanceDto) {
  const existingMaintenance = await this.prisma.maintenance.findFirst({ where: { id , isDeleted: false }, });
  if (!existingMaintenance) {
  throw new NotFoundException(`Maintenance record with ID ${id} not found.`);
  }

    if (updateDto.vehicleId) {
    const vehicleExists = await this.prisma.vehicle.findUnique({
    where: { id: updateDto.vehicleId },
    });
    if (!vehicleExists) {
    throw new BadRequestException(`Vehicle with ID ${updateDto.vehicleId} not found.`);
    }
    }
    
    if (updateDto.partsInventoryId) {
      const partsExists = await this.prisma.partsInventory.findUnique({
          where: { id: updateDto.partsInventoryId },
          });
          if (!partsExists) {
            throw new BadRequestException(`Parts with ID ${updateDto.partsInventoryId} not found.`);
          }
        }
    
      return await this.prisma.maintenance.update({
          where: { id },
          data: {
            vehicleId: updateDto.vehicleId,
            partsInventoryId: updateDto.partsInventoryId,
            startDate: updateDto.startDate,
            endDate: updateDto.endDate,
            quantity: updateDto.quantity,
            totalCost: updateDto.totalCost,
            vendorName: updateDto.vendorName,
            details: updateDto.details,
            status: updateDto.status,
          },
          include: { vehicle: true ,partsInventory: true },
        });
    }
    
    async removeMaintenance(id: number) {
      try {
        return await this.prisma.maintenance.update({
          where: { id },
          data:{ isDeleted: false }, 
        });
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete maintenance.');
      }
    }

  }
