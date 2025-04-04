import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VehicleGroupController } from './vehicle.group.controller';
import { VehicleGroupService } from './vehicle.group.service';

@Module({
    imports: [PrismaModule],
    controllers: [VehicleGroupController],
    providers: [VehicleGroupService],
    exports: [VehicleGroupService],
})
export class VehicleGroupModule {}
