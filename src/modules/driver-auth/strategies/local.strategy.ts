import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { DriverAuthService } from '../driver-auth.service';
import { messages } from 'src/common/constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly driverAuthService: DriverAuthService) {
    super({ usernameField: 'mobileNo' });
  }

  async validate(mobileNo: string, password: string): Promise<any> {
    const driver = await this.driverAuthService.validateDriver(mobileNo, password);
    if (!driver) {
      throw new UnauthorizedException(messages.invalid_credentials);
    }
    return driver;
  }
} 

