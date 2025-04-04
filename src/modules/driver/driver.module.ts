import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { CryptoModule } from 'src/common/crypto.module'; 

@Module({
    imports: [PrismaModule, CryptoModule],
    controllers: [DriverController],
    providers: [DriverService],
     exports: [DriverService],
})
export class DriverModule {}
