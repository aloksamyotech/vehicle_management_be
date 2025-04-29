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
import { PartsService } from './parts.service';
import { CreatePartsDto, UpdatePartsDto } from './parts.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('api/parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get('fetch')
  @UseGuards(JwtAuthGuard)
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);

    return isAll
      ? this.partsService.getAll()
      : this.partsService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreatePartsDto) {
    return this.partsService.create(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getGroupById(@Param('id', ParseIntPipe) id: number) {
    return await this.partsService.getGroupById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePartsDto,
  ) {
    return this.partsService.update(id, updateDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeParts(@Param('id', ParseIntPipe) id: number) {
    return await this.partsService.removeParts(id);
  }
}
