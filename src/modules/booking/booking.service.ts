import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,BadRequestException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateBookingDto , UpdateBookingDto} from './booking.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.booking.findMany({
      where: { isDeleted: false }, 
      include: {
        vehicle: true,
        driver : true,
        customer : true,
      },
    });
  }

  async getById(id: number) {
    const result = await this.prisma.booking.findUnique({
      where: { id ,isDeleted: false },
      include: {
        vehicle: true,
        driver: true,
        customer: true,
      },
    });
    if (!result) {
      throw new NotFoundException(`Booking with ID ${id} not found.`);
    }
    return result;
  }

  async createBooking(createdto: CreateBookingDto) {
      return await this.prisma.booking.create({
        data: createdto,
      });
  }
  
  async updateBooking(id: number, updateDto: UpdateBookingDto) {
  const existingBooking = await this.prisma.booking.findUnique({ where: { id } });
  if (!existingBooking) {
  throw new NotFoundException(`Booking record with ID ${id} not found.`);
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

    if (updateDto.customerId) {
          const customerExists = await this.prisma.customer.findUnique({
              where: { id: updateDto.customerId },
              });
              if (!customerExists) {
                throw new BadRequestException(`Customer with ID ${updateDto.customerId} not found.`);
              }
            }
    
      return await this.prisma.booking.update({
          where: { id },
          data: {
            vehicleId: updateDto.vehicleId,
            driverId: updateDto.driverId,
            customerId: updateDto.customerId,
            tripType: updateDto.tripType,
            tripStartDate: updateDto.tripStartDate,
            tripEndDate: updateDto.tripEndDate,
            tripStartLoc: updateDto.tripStartLoc,
            tripEndLoc: updateDto.tripEndLoc,
            totalKm: updateDto.totalKm,
            totalAmt: updateDto.totalAmt,
            tripStatus: updateDto.tripStatus,
          },
          include: { vehicle: true ,driver: true ,customer: true },
        });
    }
    
    async removeBooking(id: number) {
      try {
        return await this.prisma.booking.update({
          where: { id },
          data: { isDeleted: true },
        });
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete booking record.');
      }
    }

  }
