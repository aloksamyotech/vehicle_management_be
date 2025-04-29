import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import {
  CreateMaintenanceDto,
  UpdateMaintenanceStatusDto,
} from './maintenance.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('api/maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

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
      ? this.maintenanceService.getAll()
      : this.maintenanceService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async createMaintenance(@Body() body: CreateMaintenanceDto) {
    return this.maintenanceService.createMaintenance(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.maintenanceService.getById(id);
  }

  @Put('updateStatus/:id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateMaintenanceStatusDto,
  ) {
    return this.maintenanceService.updateStatus(Number(id), statusDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeMaintenance(@Param('id', ParseIntPipe) id: number) {
    return await this.maintenanceService.removeMaintenance(id);
  }
}
