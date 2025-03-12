import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateCustomerDto , UpdateCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.customer.findMany({
      where: { isDeleted: false }, 
    });
  }

  async createCustomer(customerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: customerDto,
    });
  }

  async getById(id: number) {
    const result = await this.prisma.customer.findUnique({
      where: { id ,  isDeleted: false  }
    });
    if (!result) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return result;
  }

 async update(id: number, updateDto: UpdateCustomerDto) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update customer.');
    }
  }

  async removeCustomer(id: number) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete customer.');
    }
  }
  }
