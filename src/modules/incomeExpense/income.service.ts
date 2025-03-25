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
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.incomeExpense.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
      include: {
        vehicle: true,
      },
    });
  }

  async create(dtoData: CreateIncomeExpenseDto) {
    try {
      return await this.prisma.incomeExpense.create({
        data: dtoData,
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getById(id: number) {
    const result = await this.prisma.incomeExpense.findUnique({
      where: { id, isDeleted: false },
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
        vehicleId: updateDto.vehicleId ?? existingIncome.vehicleId,
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

  async getVehicleReport(
    vehicleId?: number,
    startDate?: Date,
    endDate?: Date
  ) {
    const report = await this.prisma.incomeExpense.findMany({
      where: {
        isDeleted: false,
        vehicleId: vehicleId || undefined,
        date: {
          gte: startDate || undefined,
          lte: endDate || undefined,
        },
      },
      orderBy: { createdAt: 'asc' },
      select: {
        vehicle: { select: { id: true, vehicleName: true } },
        createdAt: true,
        date: true,
        amount: true,
        type: true,
        description: true,
      },
    });
  
    if (!report.length) {
      throw new NotFoundException(messages.data_not_found);
    }
  
    let income = 0;
    let expense = 0;
  
    report.forEach((item) => {
      if (item.type === 'Income') {
        income += item.amount;
      } else if (item.type === 'Expense') {
        expense += item.amount;
      }
    });
  
    const profitOrLoss = income - expense;
    const status = profitOrLoss >= 0 ? 'Profit' : 'Loss';
  
    return {
      incomeExpenseDetails: report,
      summary: {
        income,
        expense,
        profitOrLoss,
        status,
      },
    };
  }
}
