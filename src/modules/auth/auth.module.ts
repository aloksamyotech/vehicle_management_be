import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { CryptoModule } from '../../common/crypto.module';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    PassportModule,
    JwtModule.register({
      secret:'9c73ed9ef8fc840244d49df36be46d6d78017abc381ed17b153ce9316eeb274986de2c73b6494608ab36c145e89c4cecb2b32eb2f5b0c637dd5e45c8d32e46a231a88e29aa02cbafabfae56d51b9eff30ed2bb8ffaba64ce61c016d59ecce22682f42db38f5defaaf81fb65e0239d7bb1aa71cbec79db14fd6ee450c6f23a093c296c264b44ab655d94d819772380785d2d591c899fc05766098da531c0f0f0fa998fbcd40dcd97df24efaa3669e5022ff7656909dbd85ecd0ac710a46af797f15df54295884cc560ec62410f71c400945c6d1323fc32660d51fd285950fbf9df1e1123d6843ebc363dfa03465bd00670ed071f299728466c0b08ced2be605a3',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {} 