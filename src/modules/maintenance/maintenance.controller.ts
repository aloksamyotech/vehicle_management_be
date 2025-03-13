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
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get('fetch')
  async getAll() {
    return this.maintenanceService.getAll();
  }

  @Post('save')
  async createMaintenance(@Body() body: CreateMaintenanceDto) {
    return this.maintenanceService.createMaintenance(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.maintenanceService.getById(id);
  }

  @Patch('update/:id')
  async updateMaintenance(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateDto: UpdateMaintenanceDto
  ) {
  return this.maintenanceService.updateMaintenance(id, updateDto);
  }

  @Delete('delete/:id')
  async removeMaintenance(@Param('id', ParseIntPipe) id: number) {
    return await this.maintenanceService.removeMaintenance(id);
  }
  
}
