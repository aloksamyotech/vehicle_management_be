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
import { PartsService } from './parts.service';
import { CreatePartsDto, UpdatePartsDto } from './parts.dto';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get('fetch')
  async getAll() {
    return this.partsService.getAll();
  }

  @Post('save')
  async create(@Body() body: CreatePartsDto) {
    return this.partsService.create(body);
  }

  @Get('getById/:id')
  async getGroupById(@Param('id', ParseIntPipe) id: number) {
    return await this.partsService.getGroupById(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePartsDto,
  ) {
    return this.partsService.update(id, updateDto);
  }

  @Delete('delete/:id')
  async removeParts(@Param('id', ParseIntPipe) id: number) {
    return await this.partsService.removeParts(id);
  }
  
}
