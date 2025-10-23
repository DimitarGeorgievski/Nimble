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
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { RoleGuard } from 'src/role/role.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleType } from 'src/role/roles.model';
import { Roles } from 'src/role/role.decorator';

@Roles(RoleType.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Roles(RoleType.MANAGER)
  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get()
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.menuItemsService.findOneByName(name);
  }
  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get('/order/:id')
  findOneByOrder(@Param('id') id: string) {
    return this.menuItemsService.findOneByOrder(id);
  }

  @Roles(RoleType.MANAGER, RoleType.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Roles(RoleType.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Roles(RoleType.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(id);
  }
}
