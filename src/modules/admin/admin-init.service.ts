import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.services';
import { CryptoService } from 'src/common/crypto.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AdminInitService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';
    const { encryptedText, iv } = this.cryptoService.encrypt(adminPassword);

    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      await this.prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Admin User',
          password: encryptedText,
          iv: iv,
          role: UserRole.ADMIN,
          isActive: true,
          currencySymbol: '₹',
          currencyCode: 'INR',
        },
      });
      console.log('Default admin user created successfully');
    }
  }
} 