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
} from '@nestjs/common';
import { DriverService } from './driver.service';
import {
  CreateDriverDto,
  UpdateDriverDto,
  UpdateStatusDto,
} from './driver.dto';

@Controller('api/driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get('fetch')
  async getAll() {
    return this.driverService.getAll();
  }

  @Post('save')
  async createDriver(@Body() body: CreateDriverDto) {
    return this.driverService.createDriver(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.getById(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDriverDto,
  ) {
    return this.driverService.update(id, updateDto);
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.driverService.updateStatus(Number(id), statusDto);
  }

  @Delete('delete/:id')
  async removeVehicle(@Param('id', ParseIntPipe) id: number) {
    return await this.driverService.removeDriver(id);
  }
}
