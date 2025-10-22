import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business) private businessRepo: Repository<Business>,
  ) {}
  async create(data: CreateBusinessDto) {
    try {
      const foundBusiness = await this.findOneByName(data.name);
      if (foundBusiness)
        throw new BadRequestException('business with this name already exists');
      const newUser = await this.businessRepo.save({
        ...data,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
        taxId: data.taxId ? { id: data.taxId } : undefined,
        categories: data.categories?.map((id) => ({ id })),
        businessAddress: data.businessAddress?.map((id) => ({ id })),
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'business with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.businessRepo.find({
      relations: {
        taxId: true,
        serviceFeeId: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundBusiness = await this.businessRepo.findOneByOrFail({ id });
      return foundBusiness;
    } catch (error) {
      throw new NotFoundException('business not found');
    }
  }
  async findOneByName(name: string) {
    try {
      const foundBusiness = await this.businessRepo.findOneByOrFail({ name });
      return foundBusiness;
    } catch (error) {
      throw new NotFoundException('business not found');
    }
  }
  async findBusinessCategories(id: string) {
    return await this.businessRepo.find({
      where: { id },
      relations: {
        categories: true,
      },
    });
  }
  async findBusinessAdress(id: string) {
    return await this.businessRepo.find({
      where: { id },
      relations: {
        businessAddress: true,
      },
    });
  }
  async update(id: string, data: UpdateBusinessDto) {
    try {
      const foundBusiness = await this.findOne(id);
      Object.assign(foundBusiness, data);
      await this.businessRepo.save({
        ...data,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
        taxId: data.taxId ? { id: data.taxId } : undefined,
        categories: data.categories?.map((id) => ({ id })),
        businessAddress: data.businessAddress?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this business');
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundBusiness = await this.findOne(id);
    if (!foundBusiness) throw new NotFoundException('business not Found');
    return this.businessRepo.remove(foundBusiness);
  }
}
