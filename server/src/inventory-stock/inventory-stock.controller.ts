import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InventoryStockService } from './inventory-stock.service';
import { CreateInventoryStockDto } from './dto/create-inventory-stock.dto';
import { UpdateInventoryStockDto } from './dto/update-inventory-stock.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleType.ADMIN, RoleType.MANAGER)
@Controller('inventory-stock')
export class InventoryStockController {
  constructor(private readonly inventoryStockService: InventoryStockService) {}

  @Post()
  create(@Body() createInventoryStockDto: CreateInventoryStockDto) {
    return this.inventoryStockService.create(createInventoryStockDto);
  }

  @Get()
  findAll() {
    return this.inventoryStockService.findAll();
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.inventoryStockService.findOneByName(name);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryStockService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryStockDto: UpdateInventoryStockDto) {
    return this.inventoryStockService.update(id, updateInventoryStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryStockService.remove(id);
  }
}
