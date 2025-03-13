import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';

@Module({
    imports: [PrismaModule],
    controllers: [DriverController],
    providers: [DriverService],
})
export class DriverModule {}
