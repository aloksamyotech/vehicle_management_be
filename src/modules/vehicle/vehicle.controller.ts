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
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto , UpdateVehicleDto} from './vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('fetch')
  async getAll() {
    return this.vehicleService.getAll();
  }

  @Post('save')
  async createVehicle(@Body() body: CreateVehicleDto) {
    return this.vehicleService.createVehicle(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.getById(id);
  }

  @Patch('update/:id')
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.updateVehicle(id, updateVehicleDto);
  }

  @Delete('delete/:id')
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.removeVehicle(id);
  }
  
}
