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
import { MenuCategoriesService } from './menu-categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { RoleType } from 'src/role/roles.model';

@UseGuards(AuthGuard, RoleGuard)
@Roles(RoleType.ADMIN)
@Controller('menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}
  @Roles(RoleType.MANAGER)
  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Roles(RoleType.EMPLOYEE, RoleType.MANAGER)
  @Get()
  findAll() {
    return this.menuCategoriesService.findAll();
  }

  @Roles(RoleType.EMPLOYEE, RoleType.MANAGER)
  @Get('/menu/:id')
  findCategoryMenuItems(@Param('id') id: string) {
    return this.menuCategoriesService.findCategoryMenuItems(id);
  }
  @Roles(RoleType.EMPLOYEE, RoleType.MANAGER)
  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.menuCategoriesService.findOneByName(name);
  }
  @Roles(RoleType.EMPLOYEE, RoleType.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuCategoriesService.findOne(id);
  }
  @Roles(RoleType.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this.menuCategoriesService.update(id, updateMenuCategoryDto);
  }

  @Roles(RoleType.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCategoriesService.remove(id);
  }
}
