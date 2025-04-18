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
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateCurrencyDto,
  UpdateStatusDto,
} from './user.dto';
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('fetch')
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
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Patch('currency/:id')
  async updateCurrency(
    @Param('id') id: string,
    @Body() dto: UpdateCurrencyDto,
  ) {
    return this.userService.updateCurrency(+id, dto);
  }

  @Put('updateStatus/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ) {
    return this.userService.updateStatus(Number(id), statusDto);
  }
}
