import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { DuplicateCodes } from 'src/duplicateCodes';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem) private menuItemRepo: Repository<MenuItem>,
  ) {}
  async create(data: CreateMenuItemDto) {
    try {
      const foundMenuItem = await this.findOneByName(data.name);
      if (foundMenuItem)
        throw new BadRequestException(
          'menu item with this name already exists',
        );
      const newUser = await this.menuItemRepo.save({
        ...data,
        categoryId: data.categoryId ? { id: data.categoryId } : undefined,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        taxFeeId: data.taxFeeId ? { id: data.taxFeeId } : undefined,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
        order: data.order?.map((id) => ({ id })),
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'menu item with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.menuItemRepo.find({
      relations: {
        businessLocationId: true,
        categoryId: true,
        taxFeeId: true,
        serviceFeeId: true,
      },
    });
  }
  async findOneByOrder(id: string) {
    return await this.menuItemRepo.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundMenuItem = await this.menuItemRepo.findOneByOrFail({ id });
      return foundMenuItem;
    } catch (error) {
      throw new NotFoundException('menu item not found');
    }
  }
  async findOneByName(name: string) {
    try {
      const foundMenuItem = await this.menuItemRepo.findOneByOrFail({ name });
      return foundMenuItem;
    } catch (error) {
      throw new NotFoundException('menu item not found');
    }
  }
  async update(id: string, data: UpdateMenuItemDto) {
    try {
      const foundMenuItem = await this.findOne(id);
      Object.assign(foundMenuItem, data);
      await this.menuItemRepo.save({
        ...data,
        categoryId: data.categoryId ? { id: data.categoryId } : undefined,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        taxFeeId: data.taxFeeId ? { id: data.taxFeeId } : undefined,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
        order: data.order?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this menu item');
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundMenuItem = await this.findOne(id);
    if (!foundMenuItem) throw new NotFoundException('menu item not Found');
    return this.menuItemRepo.remove(foundMenuItem);
  }
}
