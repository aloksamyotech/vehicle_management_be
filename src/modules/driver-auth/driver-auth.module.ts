import { Module } from '@nestjs/common';
import { DriverAuthService } from './driver-auth.service';
import { DriverAuthController } from './driver-auth.controller';
import { DriverModule } from '../driver/driver.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CryptoModule } from 'src/common/crypto.module';

@Module({
  imports: [
    DriverModule,
    CryptoModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [DriverAuthController],
  providers: [DriverAuthService, LocalStrategy, JwtStrategy],
  exports: [DriverAuthService],
})
export class DriverAuthModule {}
