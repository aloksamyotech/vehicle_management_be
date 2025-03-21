import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateDriverDto , UpdateDriverDto } from './driver.dto';

@Injectable()
export class DriverService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.driver.findMany({
      where: { isDeleted: false }, 
    });
  }

  async createDriver(driverDto: CreateDriverDto) {
    return this.prisma.driver.create({
      data: driverDto,
    });
  }

  async getById(id: number) {
    const result = await this.prisma.driver.findUnique({
      where: { id ,  isDeleted: false  }
    });
    if (!result) {
      throw new NotFoundException(`Driver with ID ${id} not found.`);
    }
    return result;
  }

 async update(id: number, updateDto: UpdateDriverDto) {
    try {
      return await this.prisma.driver.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update driver.');
    }
  }

  async removeDriver(id: number) {
    try {
      return await this.prisma.driver.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete driver.');
    }
  }
  }
