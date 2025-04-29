import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import {
  CreateDriverDto,
  UpdateDriverDto,
  UpdateStatusDto,
} from './driver.dto';
import { messages } from 'src/common/constant';
import { CryptoService } from 'src/common/crypto.service';

@Injectable()
export class DriverService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async getAll(page?: number, limit?: number) {
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;

    const monthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );
    const monthEnd = new Date();
    monthEnd.setHours(23, 59, 59, 999);

    const [drivers, total, totalThisMonth] = await this.prisma.$transaction([
      this.prisma.driver.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.driver.count({
        where: { isDeleted: false },
      }),
      this.prisma.driver.count({
        where: {
          isDeleted: false,
          createdAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      }),
    ]);

    const BASE_URL = process.env.image_url;

    const data = drivers.map((driver) => ({
      ...driver,
      imageUrl: driver.image
        ? `${BASE_URL}/file/stream/${driver.image.split('/').pop()}`
        : null,
      docUrl: driver.doc
        ? `${BASE_URL}/file/stream/${driver.doc.split('/').pop()}`
        : null,
    }));

    return {
      driverDetails: data,
      pagination: {
        total,
        page,
        limit,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
      totalMonthlyDrivers: totalThisMonth,
    };
  }

  async createDriver(
    driverDto: CreateDriverDto & { image?: string; doc?: string },
  ) {
    try {
      const existingDetails = await this.prisma.driver.findMany({
        where: {
          OR: [
            { licenseNo: driverDto.licenseNo },
            { mobileNo: driverDto.mobileNo },
          ],
        },
      });

      const duplicateFields: string[] = [];

      existingDetails.forEach((existingDetail) => {
        if (existingDetail.licenseNo === driverDto.licenseNo) {
          duplicateFields.push('License No');
        }
        if (existingDetail.mobileNo === driverDto.mobileNo) {
          duplicateFields.push('Mobile No');
        }
      });

      if (duplicateFields.length > 0) {
        const errorMessage = `Already exist: ${duplicateFields.join(', ')}.`;
        throw new ConflictException(errorMessage);
      }

      const imagePath = driverDto.image || '';
      const docPath = driverDto.doc || '';

      const defaultPassword = 'driver@123';
      const { encryptedText, iv } = this.cryptoService.encrypt(defaultPassword);

      return await this.prisma.driver.create({
        data: {
          name: driverDto.name,
          mobileNo: driverDto.mobileNo,
          age: driverDto.age,
          address: driverDto.address,
          licenseNo: driverDto.licenseNo,
          licenseExpiry: driverDto.licenseExpiry,
          dateOfJoining: driverDto.dateOfJoining,
          totalExp: driverDto.totalExp,
          notes: driverDto.notes,
          status: driverDto.status,
          image: imagePath,
          doc: docPath,
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
      where: { id },
    });
  
    if (!result || result.isDeleted) {
      throw new NotFoundException(messages.data_not_found);
    }
  
    const BASE_URL = process.env.image_url;
  
    const imageUrl = result.image
      ? `${BASE_URL}/file/stream/${result.image.split('/').pop()}`
      : null;
  
    const docUrl = result.doc
      ? `${BASE_URL}/file/stream/${result.doc.split('/').pop()}`
      : null;
  
    return {
      ...result,
      imageUrl,
      docUrl,
    };
  }
  
  async update(id: number, updateDto: UpdateDriverDto) {
    try {
      if (updateDto.licenseNo || updateDto.mobileNo) {
        const existingDriver = await this.prisma.driver.findFirst({
          where: {
            AND: [
              { id: { not: id } }, 
              { isDeleted: false },
              {
                OR: [
                  ...(updateDto.licenseNo ? [{ licenseNo: updateDto.licenseNo }] : []),
                  ...(updateDto.mobileNo ? [{ mobileNo: updateDto.mobileNo }] : []),
                ],
              },
            ],
          },
        });

        if (existingDriver) {
          const duplicateFields: string[] = [];
          if (existingDriver.licenseNo === updateDto.licenseNo) {
            duplicateFields.push('License No');
          }
          if (existingDriver.mobileNo === updateDto.mobileNo) {
            duplicateFields.push('Mobile No');
          }
          throw new ConflictException(`Already exist: ${duplicateFields.join(', ')}.`);
        }
      }

      return await this.prisma.driver.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(messages.data_update_failed);
    }
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
