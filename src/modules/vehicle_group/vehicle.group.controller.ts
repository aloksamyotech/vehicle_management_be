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
import { VehicleGroupService } from './vehicle.group.service';
import { CreateVehicleGroupDto, UpdateVehicleGroupDto } from './vehicle.group.dto';

@Controller('api/vehicle-group')
export class VehicleGroupController {
  constructor(private readonly vehicleGroupService: VehicleGroupService) {}

  @Get('fetch')
  async getAll() {
    return this.vehicleGroupService.getAll();
  }

  @Post('save')
  async create(@Body() body: CreateVehicleGroupDto) {
    return this.vehicleGroupService.create(body);
  }

  @Get('getById/:id')
  async getGroupById(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleGroupService.getGroupById(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateVehicleGroupDto,
  ) {
    return this.vehicleGroupService.update(id, updateGroupDto);
  }

  @Delete('delete/:id')
  async removeGroup(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleGroupService.removeGroup(id);
  }
  
}
