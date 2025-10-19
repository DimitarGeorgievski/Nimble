import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Controller('taxes')
export class TaxesController {
  constructor(private readonly taxesService: TaxesService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxesService.create(createTaxDto);
  }

  @Get()
  findAll() {
    return this.taxesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxesService.findOne(id);
  }
  
  @Get('/name/:id')
  findTaxByName(@Param('id') id: string) {
    return this.taxesService.findTaxByName(id);
  }

  @Get('/orderItems/:id')
  findTaxOrderItems(@Param('id') id: string) {
    return this.taxesService.findTaxOrderItems(id);
  }

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
