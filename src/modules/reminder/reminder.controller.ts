import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto, UpdateReminderDto } from './reminder.dto';

@Controller('api/reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('fetch')
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);

    return isAll
      ? this.reminderService.getAll()
      : this.reminderService.getAll(parsedPage, parsedLimit);
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
