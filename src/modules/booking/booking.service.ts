import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingStatusDto,
} from './booking.dto';
import { NotificationService } from 'src/common/notification.service';
import { messages } from 'src/common/constant';
@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async getAll() {
    return await this.prisma.booking.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        vehicle: true,
        driver: true,
        customer: true,
      },
    });
  }

  async getById(id: number) {
    const result = await this.prisma.booking.findUnique({
      where: { id, isDeleted: false },
      include: {
        vehicle: true,
        driver: true,
        customer: true,
      },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

  async createBooking(createdto: CreateBookingDto) {
    const { vehicleId, driverId, tripStartDate, tripEndDate } = createdto;

    const generateInvoiceNumber = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomLetters =
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)] +
        letters[Math.floor(Math.random() * letters.length)];
      const randomNumbers = Math.floor(100 + Math.random() * 9000);
      return `${randomLetters}${randomNumbers}`;
    };

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        isDeleted: false,
        OR: [
          {
            vehicleId,
            AND: [
              { tripStartDate: { lte: tripEndDate } },
              { tripEndDate: { gte: tripStartDate } },
            ],
          },
          {
            driverId,
            AND: [
              { tripStartDate: { lte: tripEndDate } },
              { tripEndDate: { gte: tripStartDate } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      throw new ConflictException(messages.vehicle_booking_duplicate);
    }
    const booking = await this.prisma.booking.create({
      data: {
        ...createdto,
        invoiceNo: generateInvoiceNumber(),
      },
      include: {
        customer: true,
        driver: true,
        vehicle: true,
      },
    });

    try {
      await this.notificationService.sendBookingConfirmationEmail(
        booking.customer.email,
        booking,
      );
    } catch (error) {
      console.error(messages.failed_email, error);
    }

    return booking;
  }

  async updateBooking(id: number, updateDto: UpdateBookingDto) {
    const existingBooking = await this.prisma.booking.findUnique({
      where: { id },
    });
    if (!existingBooking) {
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

    if (updateDto.customerId) {
      const customerExists = await this.prisma.customer.findUnique({
        where: { id: updateDto.customerId },
      });
      if (!customerExists) {
        throw new BadRequestException(messages.data_not_found);
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
      include: { vehicle: true, driver: true, customer: true },
    });
  }

  async removeBooking(id: number) {
    try {
      return await this.prisma.booking.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }

  async getVehicleBookings(
    vehicleId?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    return await this.prisma.booking.findMany({
      where: {
        isDeleted: false,
        vehicleId: vehicleId || undefined,
        tripStartDate: startDate ? { gte: startDate } : undefined,
        tripEndDate: endDate ? { lte: endDate } : undefined,
      },
      orderBy: { tripStartDate: 'asc' },
      select: {
        customer: { select: { id: true, name: true } },
        vehicle: { select: { id: true, vehicleName: true } },
        driver: { select: { id: true, name: true } },
        tripType: true,
        totalAmt: true,
        tripStatus: true,
        tripStartLoc: true,
        tripEndLoc: true,
        totalKm: true,
      },
    });
  }

  async getDriverBookings(driverId?: number, startDate?: Date, endDate?: Date) {
    return await this.prisma.booking.findMany({
      where: {
        isDeleted: false,
        driverId: driverId || undefined,
        tripStartDate: startDate ? { gte: startDate } : undefined,
        tripEndDate: endDate ? { lte: endDate } : undefined,
      },
      orderBy: { createdAt: 'asc' },
      select: {
        vehicle: { select: { id: true, vehicleName: true } },
        driver: { select: { id: true, name: true } },
        tripStartDate: true,
        createdAt: true,
        totalAmt: true,
        tripStartLoc: true,
        tripEndLoc: true,
        totalKm: true,
      },
    });
  }

  async updateBookingStatus(
    bookingId: number,
    updateDto: UpdateBookingStatusDto,
  ) {
    const { tripStatus } = updateDto;

    const existingBooking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      throw new NotFoundException(messages.data_not_found);
    }

    const updatedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        tripStatus,
        updatedAt: new Date(),
      },
    });

    return updatedBooking;
  }
}
