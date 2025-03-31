import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingStatusDto,
} from './booking.dto';

@Controller('api/booking')
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
    @Body() updateDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateDto);
  }

  @Delete('delete/:id')
  async removeBooking(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.removeBooking(id);
  }

  @Get('/report')
  async getVehicleBookings(@Query() query: any) {
    const { vehicleId, startDate, endDate } = query;

    return this.bookingService.getVehicleBookings(
      vehicleId ? Number(vehicleId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('/driver-report')
  async getDriverBookings(@Query() query: any) {
    const { driverId, startDate, endDate } = query;

    return this.bookingService.getDriverBookings(
      driverId ? Number(driverId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateBookingStatus(id, updateDto);
  }

  @Put('updateExpense/:id')
  async updateExpense(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateTripExpense(id, updateDto);
  }
}
