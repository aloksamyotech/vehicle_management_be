import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreatePaymentDto } from './payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      where: { isDeleted: false },
    });
  }

  async create(dtoData: CreatePaymentDto) {
      return await this.prisma.payment.create({
        data: dtoData,
      });
  }

  async getPaymentsByBookingId(bookingId: number) {
    return await this.prisma.payment.findMany({
      where: {
        bookingId: bookingId,
        isDeleted : false
      },
    });
  }

  async removePayment(id: number) {
      return await this.prisma.payment.update({
        where: { id },
        data: { isDeleted: true },
      });
    }
}
