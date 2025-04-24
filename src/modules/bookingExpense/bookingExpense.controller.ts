import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { BookingExpenseService } from './bookingExpense.service';
import { AddBookingExpenseDto } from './bookingExpense.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
@Controller('api/tripExpense')
export class BookingExpenseController {
  constructor(private readonly bookingExpenseService: BookingExpenseService) {}

  @Post('save')
    @UseGuards(JwtAuthGuard)
  async create(@Body() body: AddBookingExpenseDto) {
    return this.bookingExpenseService.create(body);
  }

  @Get('getBookingById/:id')
    @UseGuards(JwtAuthGuard)
  async getExpensesByBookingId(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingExpenseService.getExpenseByBookingId(id);
  }

  @Put('update/:id')
    @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingExpenseService.removeExpense(id);
  }
}
