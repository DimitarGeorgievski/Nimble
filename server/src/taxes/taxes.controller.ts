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
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';


@UseGuards(AuthGuard,RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxesService.create(createTaxDto);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get()
  findAll() {
    return this.taxesService.findAll();
  }
  
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxesService.findOne(id);
  }
  
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/name/:id')
  findTaxByName(@Param('id') id: string) {
    return this.taxesService.findTaxByName(id);
  }
  
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/orderItems/:id')
  findTaxOrderItems(@Param('id') id: string) {
    return this.taxesService.findTaxOrderItems(id);
  }
  
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/menuItems/:id')
  findTaxMenuItems(@Param('id') id: string) {
    return this.taxesService.findTaxMenuItems(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxesService.update(id, updateTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxesService.remove(id);
  }
}
