import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { IncomeExpenseModule } from './modules/incomeExpense/income.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { BookingModule } from './modules/booking/booking.module';
import { PaymentModule } from './modules/payment/payment.module';
import { BookingExpenseModule } from './modules/bookingExpense/bookinExpense.module';
import { PrismaModule } from './prisma/prisma.module';
import { AdminInitService } from './common/admin-init.service';
import { CryptoModule } from './common/crypto.module';
import { AuthModule } from './modules/auth/auth.module';
import { DriverAuthModule } from './modules/driver-auth/driver-auth.module';
import { FileModule } from './common/fileUpload/file.module';
@Module({
  imports: [
    UserModule,
    VehicleGroupModule,
    VehicleModule,
    DriverModule,
    CustomerModule,
    PartsModule,
    ReminderModule,
    FuelModule,
    IncomeExpenseModule,
    MaintenanceModule,
    BookingModule,
    PaymentModule,
    BookingExpenseModule,
    PrismaModule,
    CryptoModule,
    AuthModule,
    DriverAuthModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    AdminInitService,
  ],
})
export class AppModule {}
