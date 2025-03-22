import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceStatusDto } from './maintenance.dto';

@Controller('api/maintenance')
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

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateMaintenanceStatusDto
  ) {
    return this.maintenanceService.updateStatus(Number(id), statusDto);
  }

  @Delete('delete/:id')
  async removeMaintenance(@Param('id', ParseIntPipe) id: number) {
    return await this.maintenanceService.removeMaintenance(id);
  }
  
}
