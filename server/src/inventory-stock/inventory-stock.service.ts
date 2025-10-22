import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventoryStockDto } from './dto/create-inventory-stock.dto';
import { UpdateInventoryStockDto } from './dto/update-inventory-stock.dto';
import { InventoryStock } from './entities/inventory-stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class InventoryStockService {
  constructor(
    @InjectRepository(InventoryStock)
    private stockRepo: Repository<InventoryStock>,
  ) {}
  async create(data: CreateInventoryStockDto) {
    try {
      const foundInventoryStock = await this.findOneByName(data.itemName);
      if (foundInventoryStock)
        throw new BadRequestException(
          'invnetory item with this name already exists',
        );
      const newUser = await this.stockRepo.save({
        ...data,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'invnetory item with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.stockRepo.find({
      relations: {
        businessLocationId: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundInventoryStock = await this.stockRepo.findOneByOrFail({ id });
      return foundInventoryStock;
    } catch (error) {
      throw new NotFoundException('invnetory item not found');
    }
  }
  async findOneByName(itemName: string) {
    try {
      const foundInventoryStock = await this.stockRepo.findOneByOrFail({
        itemName,
      });
      return foundInventoryStock;
    } catch (error) {
      throw new NotFoundException('invnetory item not found');
    }
  }
  async update(id: string, data: UpdateInventoryStockDto) {
    try {
      const foundInventoryStock = await this.findOne(id);
      Object.assign(foundInventoryStock, data);
      await this.stockRepo.save({
        ...data,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Got Issue with updating this invnetory item',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundInventoryStock = await this.findOne(id);
    if (!foundInventoryStock)
      throw new NotFoundException('invnetory item not Found');
    return this.stockRepo.remove(foundInventoryStock);
  }
}
