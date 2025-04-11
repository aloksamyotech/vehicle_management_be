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

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.incomeExpense.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
        include: {
          vehicle: true,
        },
      }),
      this.prisma.incomeExpense.count({
        where: { isDeleted: false },
      }),
    ]);

    return {
      incomeDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
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
    return await this.prisma.incomeExpense.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async getVehicleReport(
    vehicleId?: number,
    startDate?: Date,
    endDate?: Date,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const whereClause = {
      isDeleted: false,
      vehicleId: vehicleId || undefined,
      date: {
        gte: startDate || undefined,
        lte: endDate || undefined,
      },
    };

    const [report, total] = await this.prisma.$transaction([
      this.prisma.incomeExpense.findMany({
        where: whereClause,
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
        select: {
          vehicle: { select: { id: true, vehicleName: true } },
          createdAt: true,
          date: true,
          amount: true,
          type: true,
          description: true,
        },
      }),
      this.prisma.incomeExpense.count({
        where: whereClause,
      }),
    ]);

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
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getMonthlySummary(year?: number) {
    const currentYear = new Date().getFullYear();
    const targetYear = year || currentYear;

    const records = await this.prisma.incomeExpense.findMany({
      where: {
        date: {
          gte: new Date(`${targetYear}-01-01`),
          lt: new Date(`${targetYear + 1}-01-01`),
        },
        isDeleted: false,
      },
      select: {
        date: true,
        type: true,
        amount: true,
      },
    });

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));

    for (const entry of records) {
      const monthIndex = entry.date.getMonth();
      if (entry.type === 'Income') {
        months[monthIndex].income += entry.amount;
      } else if (entry.type === 'Expense') {
        months[monthIndex].expense += entry.amount;
      }
    }

    return months.map((m, i) => ({
      month: i + 1,
      name: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ][i],
      income: m.income,
      expense: m.expense,
      profitOrLoss: m.income - m.expense,
    }));
  }
}
