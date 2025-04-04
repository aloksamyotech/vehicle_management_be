import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DriverService } from '../driver/driver.service';
import { CryptoService } from 'src/common/crypto.service';
import { DriverLoginDto } from './dto/driver-login.dto';
import { messages } from 'src/common/constant';

@Injectable()
export class DriverAuthService {
  constructor(
    private readonly driverService: DriverService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateDriver(mobileNo: string, password: string) {
    const driver = await this.driverService.findByPhone(mobileNo);
    
    if (driver && !driver.isDeleted) {
      const decryptedPassword = this.cryptoService.decrypt(driver.password, driver.iv);
      if (decryptedPassword === password) {
        const { password, iv, ...result } = driver;
        return result;
      }
    }
    return null;
  }

  async login(driver: any) {
    const payload = { 
      sub: driver.id, 
      mobileNo: driver.mobileNo,
      role: 'DRIVER' 
    };

    return {
      access_token: this.jwtService.sign(payload),
      driver: {
        id: driver.id,
        name: driver.name,
        mobileNo: driver.mobileNo,
        address: driver.address,
        licenseNo: driver.licenseNo,
        dateOfJoining:driver.dateOfJoining,
        status: driver.status,
      },
    };
  }
} 