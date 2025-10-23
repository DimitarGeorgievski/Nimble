import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }
  @Roles(RoleType.MANAGER)
  @Get()
  findAll() {
    return this.tablesService.findAll();
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/orders')
  findAllTableOrders() {
    return this.tablesService.findAllTableOrders();
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/reservations')
  findAllTableReservations() {
    return this.tablesService.findAllTableReservations();
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
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
