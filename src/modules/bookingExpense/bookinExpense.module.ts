import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingExpenseController } from './bookingExpense.controller';
import { BookingExpenseService } from './bookingExpense.service';

@Module({
    imports: [PrismaModule],
    controllers: [BookingExpenseController],
    providers: [BookingExpenseService],
})
export class BookingExpenseModule {}
