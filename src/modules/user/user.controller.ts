import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save')
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Get('fetch')
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.userService.login(body.email, body.password);
  }

  @Get('getById/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.removeUser(id);
  }
}
