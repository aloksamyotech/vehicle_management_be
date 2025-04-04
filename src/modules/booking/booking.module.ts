import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { NotificationService } from 'src/common/notification.service';

@Module({
    imports: [PrismaModule],
    controllers: [BookingController],
    providers: [BookingService, NotificationService],
})
export class BookingModule {}
