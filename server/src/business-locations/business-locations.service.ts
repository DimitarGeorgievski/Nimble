import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusinessLocationDto } from './dto/create-business-location.dto';
import { UpdateBusinessLocationDto } from './dto/update-business-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLocation } from './entities/business-location.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class BusinessLocationsService {
  constructor(
    @InjectRepository(BusinessLocation)
    private businessLocationRepo: Repository<BusinessLocation>,
  ) {}
  async create(data: CreateBusinessLocationDto) {
    try {
      const foundBusinessLocation = await this.findOneByName(data.name);
      if (foundBusinessLocation)
        throw new BadRequestException(
          'business location with this name already exists',
        );
      const newUser = await this.businessLocationRepo.save({
        ...data,
        businessId: data.businessId ? { id: data.businessId } : undefined,
        tables: data.tables?.map((id) => ({ id })),
        order: data.order?.map((id) => ({ id })),
        menuItem: data.menuItem?.map((id) => ({ id })),
        inventoryStock: data.inventoryStock?.map((id) => ({ id })),
        shift: data.shift?.map((id) => ({ id })),
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'business location with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.businessLocationRepo.find({
      relations: {
        businessId: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundBusinessLocation =
        await this.businessLocationRepo.findOneByOrFail({ id });
      return foundBusinessLocation;
    } catch (error) {
      throw new NotFoundException('business location not found');
    }
  }
  async findOneByName(name: string) {
    try {
      const foundBusinessLocation =
        await this.businessLocationRepo.findOneByOrFail({ name });
      return foundBusinessLocation;
    } catch (error) {
      throw new NotFoundException('business location not found');
    }
  }
  async findCategoryMenuItems(id: string) {
    return await this.businessLocationRepo.find({
      where: { id },
      relations: {
        menuItem: true,
      },
    });
  }
  async findCategoryTables(id: string) {
    return await this.businessLocationRepo.find({
      where: { id },
      relations: {
        tables: true,
      },
    });
  }
  async findCategoryOrders(id: string) {
    return await this.businessLocationRepo.find({
      where: { id },
      relations: {
        order: true,
      },
    });
  }
  async findCategoryinventoryStock(id: string) {
    return await this.businessLocationRepo.find({
      where: { id },
      relations: {
        inventoryStock: true,
      },
    });
  }
  async findCategoryShift(id: string) {
    return await this.businessLocationRepo.find({
      where: { id },
      relations: {
        shift: true,
      },
    });
  }
  async update(id: string, data: UpdateBusinessLocationDto) {
    try {
      const foundBusinessLocation = await this.findOne(id);
      Object.assign(foundBusinessLocation, data);
      await this.businessLocationRepo.save({
        ...data,
        businessId: data.businessId ? { id: data.businessId } : undefined,
        tables: data.tables?.map((id) => ({ id })),
        order: data.order?.map((id) => ({ id })),
        menuItem: data.menuItem?.map((id) => ({ id })),
        inventoryStock: data.inventoryStock?.map((id) => ({ id })),
        shift: data.shift?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Got Issue with updating this business location',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundBusinessLocation = await this.findOne(id);
    if (!foundBusinessLocation)
      throw new NotFoundException('business location not Found');
    return this.businessLocationRepo.remove(foundBusinessLocation);
  }
}
