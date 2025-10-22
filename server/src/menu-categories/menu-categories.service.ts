import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { Repository } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class MenuCategoriesService {
  constructor(
    @InjectRepository(MenuCategory) private orderRepo: Repository<MenuCategory>,
  ) {}
  async create(data: CreateMenuCategoryDto) {
    try {
      const foundMenuCategory = await this.findOneByName(data.name);
      if (foundMenuCategory)
        throw new BadRequestException(
          'menu category with this name already exists',
        );
      const newUser = await this.orderRepo.save({
        ...data,
        taxId: data.taxId ? { id: data.taxId } : undefined,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
        businessId: data.businessId ? { id: data.businessId } : undefined,
        menuItem: data.menuItem?.map((id) => ({ id })),
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'menu category with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.orderRepo.find({
      relations: {
        taxId: true,
        serviceFeeId: true,
        buisnessId: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundMenuCategory = await this.orderRepo.findOneByOrFail({ id });
      return foundMenuCategory;
    } catch (error) {
      throw new NotFoundException('menu category not found');
    }
  }
  async findOneByName(name: string) {
    try {
      const foundMenuCategory = await this.orderRepo.findOneByOrFail({ name });
      return foundMenuCategory;
    } catch (error) {
      throw new NotFoundException('menu category not found');
    }
  }
  async findCategoryMenuItems(id: string) {
    return await this.orderRepo.find({
      where: { id },
      relations: {
        menuItem: true,
      },
    });
  }
  async update(id: string, data: UpdateMenuCategoryDto) {
    try {
      const foundMenuCategory = await this.findOne(id);
      Object.assign(foundMenuCategory, data);
      await this.orderRepo.save({
        ...data,
        taxId: data.taxId ? { id: data.taxId } : undefined,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
        businessId: data.businessId ? { id: data.businessId } : undefined,
        menuItem: data.menuItem?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Got Issue with updating this menu category',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundMenuCategory = await this.findOne(id);
    if (!foundMenuCategory)
      throw new NotFoundException('menu category not Found');
    return this.orderRepo.remove(foundMenuCategory);
  }
}
