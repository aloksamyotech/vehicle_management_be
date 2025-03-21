import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateIncomeExpenseDto, UpdateIncomeExpenseDto } from './income.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class IncomeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.incomeExpense.findMany({
      where: { isDeleted: false }, 
      orderBy: { createdAt: 'desc' } ,
      include: {
        vehicle: true,
      },
    });
  }

  async create(dtoData: CreateIncomeExpenseDto){
    try{
      return await this.prisma.incomeExpense.create({
        data: dtoData,
      });
    }
    catch(error){
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getById(id: number) {
    const result = await this.prisma.incomeExpense.findUnique({
      where: { id ,  isDeleted: false },
      include: {
        vehicle: true,
      },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

   async update(id: number, updateDto: UpdateIncomeExpenseDto) {
      const existingIncome = await this.prisma.incomeExpense.findUnique({
        where: { id },
      });
      if (!existingIncome) {
        throw new NotFoundException(messages.data_not_found);
      }
      return await this.prisma.incomeExpense.update({
        where: { id },
        data: {
          ...updateDto,
          vehicleId:
          updateDto.vehicleId ?? existingIncome.vehicleId,
        },
        include: { vehicle: true },
      });
    }

  async removeIncome(id: number) {
    try {
      return await this.prisma.incomeExpense.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }
  }
