import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceFeeService } from './service-fee.service';
import { CreateServiceFeeDto } from './dto/create-service-fee.dto';
import { UpdateServiceFeeDto } from './dto/update-service-fee.dto';

@Controller('service-fee')
export class ServiceFeeController {
  constructor(private readonly serviceFeeService: ServiceFeeService) {}

  @Post()
  create(@Body() createServiceFeeDto: CreateServiceFeeDto) {
    return this.serviceFeeService.create(createServiceFeeDto);
  }

  @Get()
  findAll() {
    return this.serviceFeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceFeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceFeeDto: UpdateServiceFeeDto) {
    return this.serviceFeeService.update(+id, updateServiceFeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceFeeService.remove(+id);
  }
}
