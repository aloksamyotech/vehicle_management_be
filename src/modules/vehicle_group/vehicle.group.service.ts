import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateVehicleGroupDto, UpdateVehicleGroupDto } from './vehicle.group.dto';

@Injectable()
export class VehicleGroupService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.vehicleGroup.findMany({
      where: { isDeleted: false }, 
    });
  }

  async create(groupData: CreateVehicleGroupDto){
    try{
      return await this.prisma.vehicleGroup.create({
        data: groupData,
      });
    }
    catch(error){
      throw new InternalServerErrorException('Error while creating vehicle group');
    }
  }

  async getGroupById(id: number) {
    const group = await this.prisma.vehicleGroup.findUnique({
      where: { id ,  isDeleted: false  }
    });
    if (!group) {
      throw new NotFoundException(`Vehicle group with ID ${id} not found.`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateVehicleGroupDto) {
    try {
      return await this.prisma.vehicleGroup.update({
        where: { id },
        data: updateGroupDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update vehicle group.');
    }
  }

  async removeGroup(id: number) {
    try {
      return await this.prisma.vehicleGroup.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete group.');
    }
  }
  }
