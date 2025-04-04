import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingExpenseService } from './bookingExpense.service';
import { AddBookingExpenseDto } from './bookingExpense.dto';

@Controller('api/tripExpense')
export class BookingExpenseController {
  constructor(private readonly bookingExpenseService: BookingExpenseService) {}

  @Post('save')
  async create(@Body() body: AddBookingExpenseDto) {
    return this.bookingExpenseService.create(body);
  }

  @Get('getBookingById/:id')
  async getExpensesByBookingId(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingExpenseService.getExpenseByBookingId(id);
  }

  @Put('update/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingExpenseService.removeExpense(id);
  }
}
