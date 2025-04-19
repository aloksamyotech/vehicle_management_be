import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { FileService } from 'src/common/fileUpload/file.service';
import { CreateUserFeaturePermissionDto } from './user.management.dto';
import { UserManagementService } from './user.management.service';

@Controller('api/usermanagement')
export class UserManagementController {
    constructor(
        private readonly userManagementService: UserManagementService
    ) { }


    @Post('add')
    create(@Body() createUserManagementDto: CreateUserFeaturePermissionDto) {
        return this.userManagementService.addUserFeaturePermission(createUserManagementDto)
    }

}
