import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CryptoService } from '../../common/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && !user.isDeleted) {
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
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        currencySymbol: user.currencySymbol,
        currencyCode: user.currencyCode,
        phone: user.phone,
        address: user.address,
      },
    };
  }
}
