import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';

@Module({
    imports: [PrismaModule],
    controllers: [ReminderController],
    providers: [ReminderService],
    exports: [ReminderService],
})
export class ReminderModule {}
