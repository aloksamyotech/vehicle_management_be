import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeExpenseDto, UpdateIncomeExpenseDto } from './income.dto';

@Controller('income-expense')
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
}
