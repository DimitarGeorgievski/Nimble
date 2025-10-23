import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';

@UseGuards(AuthGuard,RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }
  @Roles(RoleType.EMPLOYEE,RoleType.MANAGER)
  @Get()
  findAll() {
    return this.businessService.findAll();
  }
  
  @Roles(RoleType.EMPLOYEE,RoleType.MANAGER)
  @Get('/name/:id')
  findOneByName(@Param('name') name: string) {
    return this.businessService.findOneByName(name);
  }
  @Roles(RoleType.EMPLOYEE,RoleType.MANAGER)
  @Get('/category/:id')
  findBusinessCategories(@Param('id') id: string) {
    return this.businessService.findBusinessCategories(id);
  }
  @Roles(RoleType.EMPLOYEE,RoleType.MANAGER)
  @Get('/address/:id')
  findBusinessAdress(@Param('id') id: string) {
    return this.businessService.findBusinessCategories(id);
  }
  @Roles(RoleType.EMPLOYEE,RoleType.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }
  
  @Roles(RoleType.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
