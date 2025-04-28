import {
  Body,
  Controller,
  Query,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateCustomerDto, UpdateCustomerDto } from './customer.dto';

@Controller('api/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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
      ? this.customerService.getAll()
      : this.customerService.getAll(parsedPage, parsedLimit);
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async createCustomer(@Body() body: CreateCustomerDto) {
    return this.customerService.createCustomer(body);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.getById(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async removeCustomer(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.removeCustomer(id);
  }
}
