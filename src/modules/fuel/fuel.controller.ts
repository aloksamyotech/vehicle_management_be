import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { FuelService } from './fuel.service';
import { CreateFuelDto, UpdateFuelDto } from './fuel.dto';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('api/fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

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
      ? this.fuelService.getAll()
      : this.fuelService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async createFuel(@Body() body: CreateFuelDto) {
    return this.fuelService.createFuel(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.fuelService.getById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateFuel(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFuelDto,
  ) {
    return this.fuelService.updateFuel(id, updateDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeFuel(@Param('id', ParseIntPipe) id: number) {
    return await this.fuelService.removeFuel(id);
  }

  @Get('/report')
  @UseGuards(JwtAuthGuard)
  async getVehicleReport(@Query() query: any) {
    const { vehicleId, startDate, endDate, page = 1, limit = 10 } = query;

    return this.fuelService.getVehicleReport(
      vehicleId ? Number(vehicleId) : undefined,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
