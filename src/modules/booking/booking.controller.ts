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
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingStatusDto,
} from './booking.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('fetch')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async createBooking(@Body() body: CreateBookingDto) {
    return this.bookingService.createBooking(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.getById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeBooking(@Param('id', ParseIntPipe) id: number) {
    return await this.bookingService.removeBooking(id);
  }

  @Get('/report')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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

  @Get('customer-bookings')
  @UseGuards(JwtAuthGuard)
  async getCustomerBookings(@Query() query: any) {
    const { customerId, page = 1, limit = 10 } = query;

    return this.bookingService.getBookingsByCustomer(
      Number(customerId),
      Number(page),
      Number(limit),
    );
  }

  @Put('updateStatus/:id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateBookingStatus(id, updateDto);
  }

  @Get('todayBookings/:driverId')
  @UseGuards(JwtAuthGuard)
  async getTodayDriverBookings(
    @Param('driverId', ParseIntPipe) driverId: number,
  ) {
    return this.bookingService.getTodayDriverBookings(driverId);
  }

  @Get('allBookings/:driverId')
  @UseGuards(JwtAuthGuard)
  async getAllDriverBookings(
    @Param('driverId', ParseIntPipe) driverId: number,
  ) {
    return this.bookingService.getAllDriverBookings(driverId);
  }
}
