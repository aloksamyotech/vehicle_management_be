import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateReminderDto, UpdateReminderDto } from './reminder.dto';

@Injectable()
export class ReminderService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getAll() {
    return await this.prisma.reminder.findMany({
      include: {
        vehicle: true,
      },
    });
  }

  async create(dtoData: CreateReminderDto){
    try{
      return await this.prisma.reminder.create({
        data: dtoData,
      });
    }
    catch(error){
      throw new InternalServerErrorException('Error while creating reminder');
    }
  }

  async getById(id: number) {
    const group = await this.prisma.reminder.findUnique({
      where: { id },
      include: {
        vehicle: true,
      },
    });
    if (!group) {
      throw new NotFoundException(`Reminder with ID ${id} not found.`);
    }
    return group;
  }

   async update(id: number, updateDto: UpdateReminderDto) {
      const existingReminder = await this.prisma.reminder.findUnique({
        where: { id },
      });
      if (!existingReminder) {
        throw new NotFoundException('Vehicle not found');
      }
      return await this.prisma.reminder.update({
        where: { id },
        data: {
          ...updateDto,
          vehicleId:
          updateDto.vehicleId ?? existingReminder.vehicleId,
        },
        include: { vehicle: true },
      });
    }

  async removeReminder(id: number) {
    try {
      return await this.prisma.reminder.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete reminder.');
    }
  }
  }
