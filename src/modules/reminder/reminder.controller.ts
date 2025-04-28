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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ReminderService } from './reminder.service';
import { CreateReminderDto, UpdateReminderDto } from './reminder.dto';

@Controller('api/reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('fetch')
  @UseGuards(JwtAuthGuard)
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('todayPage') todayPage?: string,
    @Query('todayLimit') todayLimit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);
    const parsedTodayPage = parseInt(todayPage || '1', 10);
    const parsedTodayLimit = parseInt(todayLimit || '5', 10);

    return isAll
      ? this.reminderService.getAll()
      : this.reminderService.getAll(
          parsedPage,
          parsedLimit,
          parsedTodayPage,
          parsedTodayLimit,
        );
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateReminderDto) {
    return this.reminderService.create(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.reminderService.getById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateReminderDto,
  ) {
    return this.reminderService.update(id, updateDto);
  }
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeReminder(@Param('id', ParseIntPipe) id: number) {
    return await this.reminderService.removeReminder(id);
  }
}
