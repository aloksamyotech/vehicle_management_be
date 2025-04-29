import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateUserFeaturePermissionDto } from './user.management.dto';
import { UserManagementService } from './user.management.service';
import { messages } from 'src/common/constant';
import { ApiBearerAuth} from '@nestjs/swagger';

@ApiBearerAuth() 
@Controller('api/usermanagement')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserManagementDto: CreateUserFeaturePermissionDto) {
    return this.userManagementService.addUserFeaturePermission(
      createUserManagementDto,
    );
  }

  @Get('fetch/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserPermissions(@Param('userId', ParseIntPipe) userId: number) {
    const permissions =
      await this.userManagementService.getUserPermissions(userId);
    if (!permissions || permissions.length === 0) {
      throw new NotFoundException(messages.data_not_found);
    }
    return {
      success: true,
      data: permissions,
      message: messages.fetching_success,
    };
  }
}
