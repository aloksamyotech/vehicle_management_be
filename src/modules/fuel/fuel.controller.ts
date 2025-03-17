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
import { FuelService } from './fuel.service';
import { CreateFuelDto, UpdateFuelDto } from './fuel.dto';

@Controller('api/fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

  @Get('fetch')
  async getAll() {
    return this.fuelService.getAll();
  }

  @Post('save')
  async createFuel(@Body() body: CreateFuelDto) {
    return this.fuelService.createFuel(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.fuelService.getById(id);
  }

  @Patch('update/:id')
  async updateFuel(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateDto: UpdateFuelDto
  ) {
  return this.fuelService.updateFuel(id, updateDto);
  }

  @Delete('delete/:id')
  async removeFuel(@Param('id', ParseIntPipe) id: number) {
    return await this.fuelService.removeFuel(id);
  }
  
}
