import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceFeeDto } from './dto/create-service-fee.dto';
import { UpdateServiceFeeDto } from './dto/update-service-fee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceFee } from './entities/service-fee.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class ServiceFeeService {
  constructor(
    @InjectRepository(ServiceFee) private serviceRepo: Repository<ServiceFee>,
  ) {}
  async create(data: CreateServiceFeeDto) {
    try {
      const foundService = await this.findServiceByName(data.name);
      if (foundService)
        throw new BadRequestException(
          'Service Fee with this name already exists',
        );
      const newService = await this.serviceRepo.save({
        ...data,
        menuCategory: data.menuCategory?.map((id) => ({ id })),
        buisness: data.buisness?.map((id) => ({ id })),
        orderItem: data.orderItem?.map((id) => ({ id })),
        menuItem: data.menuItem?.map((id) => ({ id })),
      });
      return newService;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Service Fee with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.serviceRepo.find({
      relations: {
        menuCategory: true,
        buisness: true,
        menuItem: true,
      },
    });
  }

  async findServiceByName(name: string) {
    return this.serviceRepo.findOneBy({ name });
  }

  async findServiceOrderItems(id: string) {
    return await this.serviceRepo.find({
      where: { id },
      relations: {
        orderItem: true,
      },
    });
  }

  async findServiceMenuItems(id: string) {
    return await this.serviceRepo.find({
      where: { id },
      relations: {
        menuItem: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundService = await this.serviceRepo.findOneByOrFail({ id });
      return foundService;
    } catch (error) {
      throw new NotFoundException('Tax not found');
    }
  }

  async update(id: string, data: UpdateServiceFeeDto) {
    try {
      const foundService = this.findOne(id);
      Object.assign(foundService, data);
      await this.serviceRepo.save({
        ...data,
        menuCategory: data.menuCategory?.map((id) => ({ id })),
        buisness: data.buisness?.map((id) => ({ id })),
        orderItem: data.orderItem?.map((id) => ({ id })),
        menuItem: data.menuItem?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this Service Fee');
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundService = await this.findOne(id);
    if (!foundService) throw new NotFoundException('Service Fee not Found');
    return this.serviceRepo.remove(foundService);
  }
}
