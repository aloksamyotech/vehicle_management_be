import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,BadRequestException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateFuelDto , UpdateFuelDto} from './fuel.dto';

@Injectable()
export class FuelService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.fuel.findMany({
      include: {
        vehicle: true,
        driver : true,
      },
    });
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
      throw new NotFoundException(`Fuel with ID ${id} not found.`);
    }
    return result;
  }

   async createFuel(createdto: CreateFuelDto) {
      return this.prisma.fuel.create({
        data: createdto,
      });
    }
  
  async updateFuel(id: number, updateDto: UpdateFuelDto) {
  const existingFuel = await this.prisma.fuel.findUnique({ where: { id } });
  if (!existingFuel) {
  throw new NotFoundException(`Fuel record with ID ${id} not found.`);
  }

    if (updateDto.vehicleId) {
    const vehicleExists = await this.prisma.vehicle.findUnique({
    where: { id: updateDto.vehicleId },
    });
    if (!vehicleExists) {
    throw new BadRequestException(`Vehicle with ID ${updateDto.vehicleId} not found.`);
    }
    }
    
    if (updateDto.driverId) {
      const driverExists = await this.prisma.driver.findUnique({
          where: { id: updateDto.driverId },
          });
          if (!driverExists) {
            throw new BadRequestException(`Driver with ID ${updateDto.driverId} not found.`);
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
          include: { vehicle: true ,driver: true },
        });
    }
    
    async removeFuel(id: number) {
      try {
        return await this.prisma.fuel.delete({
          where: { id },
        });
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete fuel record.');
      }
    }

  }
