import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { AddBookingExpenseDto } from './bookingExpense.dto';

@Injectable()
export class BookingExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dtoData: AddBookingExpenseDto) {
      return await this.prisma.tripExpense.create({
        data: dtoData,
      });
  }

  async getExpenseByBookingId(bookingId: number) {
    return await this.prisma.tripExpense.findMany({
      where: {
        bookingId: bookingId,
        isDeleted : false
      },
    });
  }

  async removeExpense(id: number) {
      return await this.prisma.tripExpense.update({
        where: { id },
        data: { isDeleted: true },
      });
    }
}
