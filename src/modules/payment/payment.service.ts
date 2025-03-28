import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreatePaymentDto } from './payment.dto';
import { messages } from 'src/common/constant';

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
    try {
      return await this.prisma.payment.create({
        data: dtoData,
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_add_failed);
    }
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
    try {
      return await this.prisma.payment.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }
}
