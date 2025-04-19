import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/common/fileUpload/file.module';
import { UserManagementController } from './user.management.controller';
import { UserManagementService } from './user.management.service';

@Module({
    imports: [PrismaModule, FileModule],
    controllers: [UserManagementController],
    providers: [UserManagementService],
    exports: [UserManagementService],
})
export class UserManagementModule {}
