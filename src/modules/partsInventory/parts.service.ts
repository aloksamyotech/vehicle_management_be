import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreatePartsDto, UpdatePartsDto } from './parts.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class PartsService {
  constructor(private readonly prisma: PrismaService) {}


  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.partsInventory.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.partsInventory.count({
        where: { isDeleted: false },
      }),
    ]);

    return {
      partsDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
  }

  async create(dtoData: CreatePartsDto) {
    return await this.prisma.partsInventory.create({
      data: dtoData,
    });
  }

  async getGroupById(id: number) {
    const group = await this.prisma.partsInventory.findUnique({
      where: { id, isDeleted: false },
    });
    if (!group) {
      throw new NotFoundException(messages.data_not_found);
    }
    return group;
  }

  async update(id: number, updateDto: UpdatePartsDto) {
    return await this.prisma.partsInventory.update({
      where: { id },
      data: updateDto,
    });
  }

  async removeParts(id: number) {
    return await this.prisma.partsInventory.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
