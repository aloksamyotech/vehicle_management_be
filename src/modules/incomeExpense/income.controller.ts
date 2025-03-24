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
  async getAll() {
    return this.incomeService.getAll();
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
    const { vehicleId, startDate, endDate } = query;

    return this.incomeService.getVehicleReport(
      vehicleId ? Number(vehicleId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
