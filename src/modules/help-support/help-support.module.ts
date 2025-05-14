import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HelpSupportController } from './help-support.controller';
import { HelpSupportService } from './help-support.service';

@Module({
    imports: [PrismaModule],
    controllers: [HelpSupportController],
    providers: [HelpSupportService],
})
export class HelpSupportModule {}
