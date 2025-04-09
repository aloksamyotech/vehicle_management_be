import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { CryptoService } from './crypto.service';
import { messages } from './constant';
import { UserRole } from '@prisma/client';
@Injectable()
export class AdminInitService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async onModuleInit() {
    try {
      const adminExists = await this.prisma.user.findFirst({
        where: {
          email: 'admin@gmail.com',
          isDeleted: false,
        },
      });

      if (!adminExists) {
        const { encryptedText, iv } = this.cryptoService.encrypt('admin123');
        
        await this.prisma.user.create({
          data: {
            email: 'admin@gmail.com',
            name: 'Admin',
            password: encryptedText,
            iv: iv,
            role: UserRole.ADMIN,
          },
        });

        console.log(messages.admin_created);
      }
    } catch (error) {
      console.error(messages.creating_error, error);
    }
  }
} 