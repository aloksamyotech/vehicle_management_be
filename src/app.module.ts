import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { VehicleGroupModule } from './modules/vehicle_group/vehicle.group.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';

@Module({
  imports: [TestModule, UserModule,VehicleGroupModule , VehicleModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },],
})
export class AppModule {}
