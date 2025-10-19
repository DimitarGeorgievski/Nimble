import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }
  
  @Get('/orders')
  findAllTableOrders() {
    return this.tablesService.findAllTableOrders();
  }

  @Get('/reservations')
  findAllTableReservations() {
    return this.tablesService.findAllTableReservations();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }
  @Get('/number/:number')
  findOneByNumber(@Param('number') number: number) {
    return this.tablesService.findOneByNumber(number);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete(':number')
  remove(@Param('number') number: number) {
    return this.tablesService.remove(number);
  }
}
