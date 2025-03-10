import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.services';

@Module({
    providers: [PrismaService],
    exports: [PrismaService], // So it can be injected in other modules
})
export class PrismaModule {}
