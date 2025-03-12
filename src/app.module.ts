import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { VehicleGroupModule } from './modules/vehicle_group/vehicle.group.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { DriverModule } from './modules/driver/driver.module';
import { CustomerModule } from './modules/customer/customer.module';
import { PartsModule } from './modules/partsInventory/parts.module';
import { ReminderModule } from './modules/reminder/reminder.module';
import { FuelModule } from './modules/fuel/fuel.module';
@Module({
  imports: [TestModule, UserModule,VehicleGroupModule , VehicleModule , DriverModule , CustomerModule , PartsModule, ReminderModule, FuelModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },],
})
export class AppModule {}
