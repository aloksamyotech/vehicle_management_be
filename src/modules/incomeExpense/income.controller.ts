import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeExpenseDto, UpdateIncomeExpenseDto } from './income.dto';

@Controller('api/income-expense')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get('fetch')
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);

    return isAll
      ? this.incomeService.getAll()
      : this.incomeService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  async create(@Body() body: CreateIncomeExpenseDto) {
    return this.incomeService.create(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.incomeService.getById(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateIncomeExpenseDto,
  ) {
    return this.incomeService.update(id, updateDto);
  }

  @Delete('delete/:id')
  async removeIncome(@Param('id', ParseIntPipe) id: number) {
    return await this.incomeService.removeIncome(id);
  }

  @Get('/report')
  async getVehicleReport(@Query() query: any) {
    const { vehicleId, startDate, endDate, page = 1, limit = 10 } = query;

    return this.incomeService.getVehicleReport(
      vehicleId ? Number(vehicleId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      Number(page),
      Number(limit),
    );
  }

  @Get('monthly-summary')
  getMonthlyIncomeExpense(@Query('year') year?: string) {
    return this.incomeService.getMonthlySummary(
      year ? +year : undefined,
    );
  }
}
