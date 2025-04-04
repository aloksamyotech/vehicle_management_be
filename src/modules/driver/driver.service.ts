import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateDriverDto, UpdateDriverDto ,UpdateStatusDto} from './driver.dto';
import { messages } from 'src/common/constant';
import { CryptoService } from 'src/common/crypto.service';

@Injectable()
export class DriverService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async getAll() {
    return await this.prisma.driver.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createDriver(driverDto: CreateDriverDto) {
    try {
      const existingGroup = await this.prisma.driver.findUnique({
        where: { licenseNo: driverDto.licenseNo },
      });

      if (existingGroup) {
        throw new ConflictException(messages.license_no);
      }
      const defaultPassword = 'driver@123'; 
      const { encryptedText, iv } = this.cryptoService.encrypt(defaultPassword);

      return await this.prisma.driver.create({
        data: {
          ...driverDto,
          password: encryptedText,
          iv: iv,
        },
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(messages.data_add_failed);
    }
  }

  async getById(id: number) {
    const result = await this.prisma.driver.findUnique({
      where: { id, isDeleted: false },
    });
    if (!result) {
      throw new NotFoundException(messages.data_not_found);
    }
    return result;
  }

  async update(id: number, updateDto: UpdateDriverDto) {
    return await this.prisma.driver.update({
      where: { id },
      data: updateDto,
    });
  }

async updateStatus(id: number, statusDto: UpdateStatusDto) {
    const { status } = statusDto;
    await this.prisma.driver.findUnique({ where: { id } });
    return await this.prisma.driver.update({
      where: { id },
      data: { status },
    });
  }

  async removeDriver(id: number) {
    return await this.prisma.driver.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  async findByPhone(mobileNo: string) {
    return this.prisma.driver.findUnique({
      where: { mobileNo },
    });
  }
}
