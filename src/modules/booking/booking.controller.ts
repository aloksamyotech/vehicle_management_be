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
  DefaultValuePipe,
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
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);

    return isAll
      ? this.bookingService.getAll()
      : this.bookingService.getAll(parsedPage, parsedLimit);
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
    const { vehicleId, startDate, endDate, page = 1, limit = 10 } = query;

    return this.bookingService.getVehicleBookings(
      vehicleId ? Number(vehicleId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      Number(page),
      Number(limit),
    );
  }

  @Get('driver-bookings')
  async getDriverBookings(@Query() query: any) {
    const { driverId, startDate, endDate, page = 1, limit = 10 } = query;

    return this.bookingService.getDriverBookings(
      driverId ? Number(driverId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
      Number(page),
      Number(limit),
    );
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateBookingStatus(id, updateDto);
  }
}
