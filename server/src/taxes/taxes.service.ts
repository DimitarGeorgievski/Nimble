import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tax } from './entities/tax.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class TaxesService {
  constructor(@InjectRepository(Tax) private taxRepo: Repository<Tax>) {}
  async create(data: CreateTaxDto) {
    try {
      const foundTax = await this.findTaxByName(data.name);
      if (foundTax)
        throw new BadRequestException('Tax with this name already exists');
      const newTax = await this.taxRepo.save({
        ...data,
        menuCategory: data.menuCategory?.map((id) => ({ id })),
        business: data.business?.map((id) => ({ id })),
        orderItem: data.orderItem?.map((id) => ({ id })),
        menuItem: data.menuItem?.map((id) => ({ id })),
      });
      return newTax;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Tax with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.taxRepo.find({
      relations: {
        menuCategory: true,
        business: true,
        menuItem: true,
      },
    });
  }
  async findTaxByName(name: string) {
    return this.taxRepo.findOneBy({ name });
  }
  async findTaxOrderItems(id: string) {
    return await this.taxRepo.find({
      where: { id },
      relations: {
        orderItem: true,
      },
    });
  }
  async findTaxMenuItems(id: string) {
    return await this.taxRepo.find({
      where: { id },
      relations: {
        menuItem: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundTax = await this.taxRepo.findOneByOrFail({ id });
      return foundTax;
    } catch (error) {
      throw new NotFoundException('Tax not found');
    }
  }

  async update(id: string, data: UpdateTaxDto) {
    try {
      const foundTax = this.findOne(id);
      Object.assign(foundTax, data);
      await this.taxRepo.save({
        ...data,
        menuCategory: data.menuCategory?.map((id) => ({ id })),
        business: data.business?.map((id) => ({ id })),
        orderItem: data.orderItem?.map((id) => ({ id })),
        menuItem: data.menuItem?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this user');
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundTax = await this.findOne(id);
    if(!foundTax) throw new NotFoundException("Tax not Found");
    return this.taxRepo.remove(foundTax);
  }
}
