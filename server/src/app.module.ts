import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BusinessModule } from './business/business.module';
import { BusinessLocationsModule } from './business-locations/business-locations.module';
import { TablesModule } from './tables/tables.module';
import { MenuCategoriesModule } from './menu-categories/menu-categories.module';
import { TaxesModule } from './taxes/taxes.module';
import { ServiceFeeModule } from './service-fee/service-fee.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    BusinessModule,
    BusinessLocationsModule,
    TablesModule,
    MenuCategoriesModule,
    TaxesModule,
    ServiceFeeModule,
    OrdersModule,
    OrderItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
