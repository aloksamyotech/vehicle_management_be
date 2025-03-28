import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './payment.dto';

@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('fetch')
  async getAll() {
    return this.paymentService.getAll();
  }

  @Post('save')
  async create(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }

  @Get('getBookingById/:id')
  async getPaymentsByBookingId(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentService.getPaymentsByBookingId(id);
  }

  @Put('update/:id')
  async removePayment(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentService.removePayment(id);
  }
}
