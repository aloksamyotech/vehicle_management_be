import {
  Body,
  Controller,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { HelpSupportService } from './help-support.service';
import { CreateHelpSupportDto } from './help-support.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('api/help-support')
export class HelpSupportController {
  constructor(private helpSupportService: HelpSupportService) {}

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateHelpSupportDto) {
    return this.helpSupportService.createHelpSupport(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getAllForDriver(@Param('id', ParseIntPipe) id: number) {
    return this.helpSupportService.getHelpSupportsByDriver(id);
  }
}
