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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleType } from 'src/role/roles.model';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/name/:name')
  findRoleByName(@Param('name') name: string) {
    return this.rolesService.findRoleByName(name);
  }

  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
