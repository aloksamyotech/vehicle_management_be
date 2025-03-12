import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';

@Module({
    imports: [PrismaModule],
    controllers: [PartsController],
    providers: [PartsService],
})
export class PartsModule {}
