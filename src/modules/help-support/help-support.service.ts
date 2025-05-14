import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { CreateHelpSupportDto } from './help-support.dto';

@Injectable()
export class HelpSupportService {
  constructor(private prisma: PrismaService) {}

  async createHelpSupport(dto: CreateHelpSupportDto) {
    return await this.prisma.helpSupport.create({
      data: dto,
    });
  }

  async getHelpSupportsByDriver(driverId: number) {
    return await this.prisma.helpSupport.findMany({
      where: { driverId: driverId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
