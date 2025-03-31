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

  async getAll() {
    return await this.prisma.customer.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
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
