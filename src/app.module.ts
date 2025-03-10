import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TestModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
