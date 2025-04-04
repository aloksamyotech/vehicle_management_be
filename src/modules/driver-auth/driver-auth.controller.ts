import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { DriverAuthService } from './driver-auth.service';
import { DriverLoginDto } from './dto/driver-login.dto';
import { messages } from 'src/common/constant';

@Controller('api/auth')
export class DriverAuthController {
  constructor(private readonly driverAuthService: DriverAuthService) {}

  @Post('login')
  async login(@Body() loginDto: DriverLoginDto) {
    const user = await this.driverAuthService.validateDriver(
      loginDto.mobileNo,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException(messages.invalid_credentials);
    }

    return this.driverAuthService.login(user);
  }
}
