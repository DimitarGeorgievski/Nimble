import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessLocationsService } from './business-locations.service';
import { CreateBusinessLocationDto } from './dto/create-business-location.dto';
import { UpdateBusinessLocationDto } from './dto/update-business-location.dto';

@Controller('business-locations')
export class BusinessLocationsController {
  constructor(private readonly businessLocationsService: BusinessLocationsService) {}

  @Post()
  create(@Body() createBusinessLocationDto: CreateBusinessLocationDto) {
    return this.businessLocationsService.create(createBusinessLocationDto);
  }

  @Get()
  findAll() {
    return this.businessLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessLocationDto: UpdateBusinessLocationDto) {
    return this.businessLocationsService.update(+id, updateBusinessLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessLocationsService.remove(+id);
  }
}
