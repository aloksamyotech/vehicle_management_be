import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateReminderDto, UpdateReminderDto } from './reminder.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class ReminderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.reminder.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          vehicle: true,
        },
      }),
      this.prisma.reminder.count(),
    ]);

    return {
      reminderDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
  }

  async create(dtoData: CreateReminderDto) {
    return await this.prisma.reminder.create({
      data: dtoData,
    });
  }

  async getById(id: number) {
    const group = await this.prisma.reminder.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });
    if (!group) {
      throw new NotFoundException(messages.data_not_found);
    }
    return group;
  }

  async update(id: number, updateDto: UpdateReminderDto) {
    const existingReminder = await this.prisma.reminder.findUnique({
      where: { id },
    });
    if (!existingReminder) {
      throw new NotFoundException(messages.data_not_found);
    }
    return await this.prisma.reminder.update({
      where: { id },
      data: {
        ...updateDto,
        vehicleId: updateDto.vehicleId ?? existingReminder.vehicleId,
      },
      include: { vehicle: true },
    });
  }

  async removeReminder(id: number) {
    return await this.prisma.reminder.delete({
      where: { id },
    });
  }
}
