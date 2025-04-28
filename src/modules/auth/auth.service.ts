import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CryptoService } from '../../common/crypto.service';
import { UserManagementService } from '../userManagement/user.management.service';
import { PrismaService } from 'src/prisma/prisma.services';
import { Prisma } from '@prisma/client';
import { messages } from 'src/common/constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    private readonly userManagementService: UserManagementService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && !user.isDeleted) {
      if (!user.isActive) {
        throw new UnauthorizedException(messages.account_inactive);
      }

      const decryptedPassword = this.cryptoService.decrypt(
        user.password,
        user.iv,
      );
      if (decryptedPassword === password) {
        const { password, iv, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    let permissions: any[] = [];
    if (user.role === 'USER') {
      permissions = await this.userManagementService.getUserPermissions(
        user.id,
      );
    }
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      permissions: permissions.length > 0 ? permissions : undefined,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions,
        currencySymbol: user.currencySymbol,
        currencyCode: user.currencyCode,
        phone: user.phone,
        address: user.address,
      },
    };
  }
}
