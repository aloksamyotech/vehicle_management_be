import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { FileModule } from 'src/common/fileUpload/file.module';

@Module({
    imports: [PrismaModule, FileModule],
    controllers: [VehicleController],
    providers: [VehicleService],
    exports: [VehicleService],
})
export class VehicleModule {}
