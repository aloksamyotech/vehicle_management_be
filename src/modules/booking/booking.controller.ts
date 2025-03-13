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
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('fetch')
  async getAll() {
    return this.bookingService.getAll();
  }

  @Post('save')
  async createBooking(@Body() body: CreateBookingDto) {
    return this.bookingService.createBooking(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.getById(id);
  }

  @Patch('update/:id')
  async updateBooking(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateDto: UpdateBookingDto
  ) {
  return this.bookingService.updateBooking(id, updateDto);
  }

  @Delete('delete/:id')
  async removeBooking(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.removeBooking(id);
  }
  
}
