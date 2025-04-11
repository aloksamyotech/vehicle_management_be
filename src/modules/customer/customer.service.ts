import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const monthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const monthEnd = new Date();
    monthEnd.setHours(23, 59, 59, 999);

    const [data, total, totalThisMonth] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.customer.count({
        where: { isDeleted: false },
      }),
      this.prisma.customer.count({
        where: {
          isDeleted: false,
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ]);

    return {
      customerDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
      totalMonthlyCustomers: totalThisMonth,
    };
  }

  async createCustomer(customerDto: CreateCustomerDto) {
    try {
      const existingGroup = await this.prisma.customer.findUnique({
        where: { email: customerDto.email },
      });

      if (existingGroup) {
        throw new ConflictException(messages.email);
      }
      return await this.prisma.customer.create({
        data: customerDto,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getById(id: number) {
    const result = await this.prisma.customer.findUnique({
      where: { id, isDeleted: false },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

  async update(id: number, updateDto: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      where: { id },
      data: updateDto,
    });
  }

  async removeCustomer(id: number) {
    return await this.prisma.customer.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
