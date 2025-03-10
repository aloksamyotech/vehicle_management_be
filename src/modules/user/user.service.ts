import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Prisma } from '@prisma/client';
import { CryptoService } from 'src/common/crypto.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async createUser(userData: CreateUserDto) {
    try {
      const { encryptedText, iv } = this.cryptoService.encrypt(
        userData.password,
      );
      return await this.prisma.user.create({
        data: {
          email: userData.email || 'dummy@gmail.com',
          name: userData.name || 'dummy',
          address: userData.address || 'null',
          password: encryptedText,
          iv: iv,
          phone: userData.phone || 'null',
          isActive: userData.isActive ?? true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error while creating user');
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const decryptedPassword = this.cryptoService.decrypt(
      user.password,
      user.iv,
    );

    if (password !== decryptedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      userId: user.id,
    };
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user.');
    }
  }

  async removeUser(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user.');
    }
  }
}
