import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';

@Module({
    imports: [PrismaModule],
    controllers: [MaintenanceController],
    providers: [MaintenanceService],
})
export class MaintenanceModule {}
