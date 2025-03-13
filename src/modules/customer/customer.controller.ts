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
import { CustomerService } from './customer.service';
import { CreateCustomerDto , UpdateCustomerDto } from './customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('fetch')
  async getAll() {
    return this.customerService.getAll();
  }

  @Post('save')
  async createCustomer(@Body() body: CreateCustomerDto) {
    return this.customerService.createCustomer(body);
  }

  @Get('getById/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.getById(id);
  }

  
    @Patch('update/:id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDto: UpdateCustomerDto,
    ) {
      return this.customerService.update(id, updateDto);
    }

  @Delete('delete/:id')
  async removeCustomer(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.removeCustomer(id);
  }
  
}
