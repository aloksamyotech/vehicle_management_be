import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateVehicleDto } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.vehicle.findMany({
      where: { isDeleted: false }, 
    });
  }

  async createVehicle(vehicleDto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: vehicleDto,
    });
  }

  async getById(id: number) {
    const result = await this.prisma.vehicle.findUnique({
      where: { id ,  isDeleted: false  }
    });
    if (!result) {
      throw new NotFoundException(`Vehicle with ID ${id} not found.`);
    }
    return result;
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
