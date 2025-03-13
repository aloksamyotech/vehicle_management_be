import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreatePartsDto, UpdatePartsDto } from './parts.dto';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.partsInventory.findMany({
      where: { isDeleted: false }, 
    });
  }

  async create(dtoData: CreatePartsDto){
    try{
      return await this.prisma.partsInventory.create({
        data: dtoData,
      });
    }
    catch(error){
      throw new InternalServerErrorException('Error while creating parts inventory');
    }
  }

  async getGroupById(id: number) {
    const group = await this.prisma.partsInventory.findUnique({
      where: { id ,  isDeleted: false  }
    });
    if (!group) {
      throw new NotFoundException(`Parts inventory with ID ${id} not found.`);
    }
    return group;
  }

  async update(id: number, updateDto: UpdatePartsDto) {
    try {
      return await this.prisma.partsInventory.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update parts inventory.');
    }
  }

  async removeParts(id: number) {
    try {
      return await this.prisma.partsInventory.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete parts inventory.');
    }
  }
  }
