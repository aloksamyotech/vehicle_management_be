import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateBookingNotificationDto } from './bookingNotification.dto';

@Injectable()
export class BookingNotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(dto: CreateBookingNotificationDto) {
    return this.prisma.bookingNotification.create({
      data: {
        driverId: dto.driverId,
        bookingId: dto.bookingId,
        message: dto.message,
        type: dto.type,
      },
    });
  }

  async getNotificationsByDriver(driverId: number) {
    return this.prisma.bookingNotification.findMany({
      where: { driverId },
      orderBy: { createdAt: 'desc' },
      include: {
        booking: true,
      },
    });
  }

  async markNotificationAsRead(id: number) {
    return this.prisma.bookingNotification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
  }
}
