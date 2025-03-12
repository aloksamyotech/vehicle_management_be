import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateFuelDto } from './fuel.dto';

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
