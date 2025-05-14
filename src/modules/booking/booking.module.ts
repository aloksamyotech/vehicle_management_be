import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { NotificationService } from 'src/common/notification.service';
import { BookingNotificationService } from './bookingNotification.service';

@Module({
    imports: [PrismaModule],
    controllers: [BookingController],
    providers: [BookingService, NotificationService, BookingNotificationService],
})
export class BookingModule {}
