import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreatePartsDto, UpdatePartsDto } from './parts.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class PartsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.partsInventory.findMany({
      where: { isDeleted: false }, 
      orderBy: { createdAt: 'desc' } 
    });
  }

  async create(dtoData: CreatePartsDto){
    try{
      return await this.prisma.partsInventory.create({
        data: dtoData,
      });
    }
    catch(error){
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getGroupById(id: number) {
    const group = await this.prisma.partsInventory.findUnique({
      where: { id ,  isDeleted: false  }
    });
    if (!group) {
      throw new NotFoundException(messages.data_not_found);
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
      throw new InternalServerErrorException(messages.data_update_failed);
    }
  }

  async removeParts(id: number) {
    try {
      return await this.prisma.partsInventory.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }
  }
