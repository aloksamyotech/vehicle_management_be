import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './payment.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('fetch')
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.paymentService.getAll();
  }

  @Post('save')
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }

  @Get('getBookingById/:id')
  @UseGuards(JwtAuthGuard)
  async getPaymentsByBookingId(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentService.getPaymentsByBookingId(id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async removePayment(@Param('id', ParseIntPipe) id: number) {
    return await this.paymentService.removePayment(id);
  }
}
