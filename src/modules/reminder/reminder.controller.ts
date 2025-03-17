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
import { ReminderService } from './reminder.service';
import { CreateReminderDto, UpdateReminderDto } from './reminder.dto';

@Controller('api/reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('fetch')
  async getAll() {
    return this.reminderService.getAll();
  }

  @Post('save')
  async create(@Body() body: CreateReminderDto) {
    return this.reminderService.create(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.reminderService.getById(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateReminderDto,
  ) {
    return this.reminderService.update(id, updateDto);
  }
  @Delete('delete/:id')
  async removeReminder(@Param('id', ParseIntPipe) id: number) {
    return await this.reminderService.removeReminder(id);
  }
  
}
