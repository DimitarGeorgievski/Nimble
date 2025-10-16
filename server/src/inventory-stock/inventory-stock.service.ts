import { Injectable } from '@nestjs/common';
import { CreateInventoryStockDto } from './dto/create-inventory-stock.dto';
import { UpdateInventoryStockDto } from './dto/update-inventory-stock.dto';

@Injectable()
export class InventoryStockService {
  create(createInventoryStockDto: CreateInventoryStockDto) {
    return 'This action adds a new inventoryStock';
  }

  findAll() {
    return `This action returns all inventoryStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryStock`;
  }

  update(id: number, updateInventoryStockDto: UpdateInventoryStockDto) {
    return `This action updates a #${id} inventoryStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryStock`;
  }
}
