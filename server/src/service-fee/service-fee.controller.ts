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
import { ServiceFeeService } from './service-fee.service';
import { CreateServiceFeeDto } from './dto/create-service-fee.dto';
import { UpdateServiceFeeDto } from './dto/update-service-fee.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('service-fee')
export class ServiceFeeController {
  constructor(private readonly serviceFeeService: ServiceFeeService) {}

  @Post()
  create(@Body() createTaxDto: CreateServiceFeeDto) {
    return this.serviceFeeService.create(createTaxDto);
  }
  @Roles(RoleType.MANAGER,RoleType.EMPLOYEE)
  @Get()
  findAll() {
    return this.serviceFeeService.findAll();
  }
  
  @Roles(RoleType.MANAGER,RoleType.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceFeeService.findOne(id);
  }
  
  @Roles(RoleType.MANAGER,RoleType.EMPLOYEE)
  @Get('/name/:id')
  findServiceByName(@Param('id') id: string) {
    return this.serviceFeeService.findServiceByName(id);
  }
  
  @Roles(RoleType.MANAGER)
  @Get('/orderItems/:id')
  findServiceOrderItems(@Param('id') id: string) {
    return this.serviceFeeService.findServiceOrderItems(id);
  }
  
  @Roles(RoleType.MANAGER)
  @Get('/menuItems/:id')
  findServiceMenuItems(@Param('id') id: string) {
    return this.serviceFeeService.findServiceMenuItems(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateServiceFeeDto) {
    return this.serviceFeeService.update(id, updateTaxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceFeeService.remove(id);
  }
}
