import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  Put,
  ParseIntPipe,
  UseGuards 
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  UpdateCurrencyDto,
  UpdateStatusDto,
} from './user.dto';
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save')
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('fetch')
  @UseGuards(JwtAuthGuard)
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('all') all?: string,
  ) {
    const isAll = all === 'true';

    const parsedPage = parseInt(page || '1', 10);
    const parsedLimit = parseInt(limit || '10', 10);

    return isAll
      ? this.userService.getAll()
      : this.userService.getAll(parsedPage, parsedLimit);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Patch('currency/:id')
  @UseGuards(JwtAuthGuard)
  async updateCurrency(
    @Param('id') id: string,
    @Body() dto: UpdateCurrencyDto,
  ) {
    return this.userService.updateCurrency(+id, dto);
  }

  @Put('updateStatus/:id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.userService.updateStatus(Number(id), statusDto);
  }

  @Patch('change-password/:id')
  @UseGuards(JwtAuthGuard)
  async changePassword( @Param('id', ParseIntPipe) id: number, @Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(Number(id), dto);
  }
}
