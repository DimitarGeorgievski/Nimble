import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceFeeService } from './service-fee.service';
import { CreateServiceFeeDto } from './dto/create-service-fee.dto';
import { UpdateServiceFeeDto } from './dto/update-service-fee.dto';

@Controller('service-fee')
export class ServiceFeeController {
  constructor(private readonly serviceFeeService: ServiceFeeService) {}

  @Post()
    create(@Body() createTaxDto: CreateServiceFeeDto) {
      return this.serviceFeeService.create(createTaxDto);
    }
  
    @Get()
    findAll() {
      return this.serviceFeeService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.serviceFeeService.findOne(id);
    }
    
    @Get('/name/:id')
    findServiceByName(@Param('id') id: string) {
      return this.serviceFeeService.findServiceByName(id);
    }
  
    @Get('/orderItems/:id')
    findServiceOrderItems(@Param('id') id: string) {
      return this.serviceFeeService.findServiceOrderItems(id);
    }
  
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
