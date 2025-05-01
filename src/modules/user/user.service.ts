import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateCurrencyDto,
  UpdateUserStatusDto,
  ChangePasswordDto,
} from './user.dto';
import { CryptoService } from 'src/common/crypto.service';
import { messages } from 'src/common/constant';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: { isDeleted: false, role: 'USER' },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.user.count({
        where: { isDeleted: false, role: 'USER' },
      }),
    ]);

    return {
      userDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
    };
  }

  async createUser(userData: CreateUserDto) {
    try {
      const existingDetails = await this.prisma.user.findMany({
        where: {
          OR: [{ email: userData.email }, { phone: userData.phone }],
        },
      });

      const duplicateFields: string[] = [];

      existingDetails.forEach((existingDetail) => {
        if (existingDetail.email === userData.email) {
          duplicateFields.push('Email Address');
        }
        if (existingDetail.phone === userData.phone) {
          duplicateFields.push('Phone No');
        }
      });

      if (duplicateFields.length > 0) {
        const errorMessage = `Already exist: ${duplicateFields.join(', ')}.`;
        throw new ConflictException(errorMessage);
      }

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
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(messages.data_add_failed);
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
      where: { id, isDeleted: false },
    });
    if (!user) {
      throw new NotFoundException(messages.data_not_found);
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
      throw new InternalServerErrorException(messages.data_update_failed);
    }
  }

  async removeUser(id: number) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { isDeleted: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(messages.data_deletion_failed);
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateCurrency(id: number, dto: UpdateCurrencyDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        currencyCode: dto.currencyCode,
        currencySymbol: dto.currencySymbol,
      },
    });
  }

  async updateStatus(id: number, statusDto: UpdateUserStatusDto) {
    const { isActive } = statusDto;
    await this.prisma.user.findUnique({ where: { id } });
    return await this.prisma.user.update({
      where: { id },
      data: { isActive },
    });
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id} });
    if (!user) throw new NotFoundException(messages.data_not_found);

    const decrypted = this.cryptoService.decrypt(user.password, user.iv);
    if (dto.oldPassword !== decrypted) {
      throw new UnauthorizedException(messages.invalid_oldpassword);
    }

    const { encryptedText, iv } = this.cryptoService.encrypt(dto.newPassword);
    await this.prisma.user.update({
      where: { id},
      data: {
        password: encryptedText,
        iv: iv,
      },
    });

    return { message: messages.data_update_successful };
  }
}
