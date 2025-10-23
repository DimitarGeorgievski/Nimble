import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessLocationsService } from './business-locations.service';
import { CreateBusinessLocationDto } from './dto/create-business-location.dto';
import { UpdateBusinessLocationDto } from './dto/update-business-location.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';

@UseGuards(AuthGuard,RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('business-locations')
export class BusinessLocationsController {
  constructor(private readonly businessLocationsService: BusinessLocationsService) {}
  
  @Post()
  create(@Body() createBusinessLocationDto: CreateBusinessLocationDto) {
    return this.businessLocationsService.create(createBusinessLocationDto);
  }
  
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get()
  findAll() {
    return this.businessLocationsService.findAll();
  }
  
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.businessLocationsService.findOneByName(name);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/menuItem/:id')
  findCategoryMenuItems(@Param('id') id: string) {
    return this.businessLocationsService.findCategoryMenuItems(id);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/table/:id')
  findCategoryTables(@Param('id') id: string) {
    return this.businessLocationsService.findCategoryTables(id);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/order/:id')
  findCategoryOrders(@Param('id') id: string) {
    return this.businessLocationsService.findCategoryOrders(id);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/stock/:id')
  findCategoryinventoryStock(@Param('id') id: string) {
    return this.businessLocationsService.findCategoryinventoryStock(id);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/shift/:id')
  findCategoryShift(@Param('id') id: string) {
    return this.businessLocationsService.findCategoryShift(id);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessLocationsService.findOne(id);
  }
  @Roles(RoleType.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessLocationDto: UpdateBusinessLocationDto) {
    return this.businessLocationsService.update(id, updateBusinessLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessLocationsService.remove(id);
  }
}
