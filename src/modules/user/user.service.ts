import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateUserDto } from './user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }
  async getUsers() {
    return await this.prisma.user.findMany();
  }
  async createUser(userData: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          email: userData.email || "dummy@gmail.com",
          name: userData.name || "dummy",
          address: userData.address || "null",
          password: userData.password || "null",
          phone: userData.phone || "null",
          isActive: userData.isActive ?? true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already exists.');
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid data provided.');
      } else {
        console.error('Database Error:', error);
        throw new InternalServerErrorException('An unexpected database error occurred.');
      }
    }
  }
}
