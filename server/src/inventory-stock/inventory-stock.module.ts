import { Module } from '@nestjs/common';
import { InventoryStockService } from './inventory-stock.service';
import { InventoryStockController } from './inventory-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryStock } from './entities/inventory-stock.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryStock]), UsersModule],
  controllers: [InventoryStockController],
  providers: [InventoryStockService],
})
export class InventoryStockModule {}
