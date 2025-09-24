import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('api/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('/create')
  async create(@Body() dto: CreateLocationDto) {
    return this.locationService.createLocation(dto);
  }

  @Get('/getById/:bookingId')
  async getLocations(@Param('bookingId') bookingId: number) {
    return this.locationService.getLocationsByBooking(bookingId);
  }
}
