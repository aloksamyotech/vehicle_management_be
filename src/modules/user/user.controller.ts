import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  Put,
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto , UpdateCurrencyDto} from './user.dto';
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.getUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Patch('currency/:id')
  async updateCurrency(@Param('id') id: string, @Body() dto: UpdateCurrencyDto) {
    return this.userService.updateCurrency(+id, dto);
  }
}
