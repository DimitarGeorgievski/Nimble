import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier) private supplierRepo: Repository<Supplier>,
  ) {}
  async create(data: CreateSupplierDto) {
    try {
      const foundSupplier = await this.findOneByEmail(data.email);
      if (foundSupplier)
        throw new BadRequestException(
          'Supplier with this email already exists',
        );
      const newSupplier = await this.supplierRepo.save(data);
      return newSupplier;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Supplier with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.supplierRepo.find();
  }

  async findOneByEmail(email: string) {
    return this.supplierRepo.findOneBy({ email });
  }

  async findOne(id: string) {
    try {
      const foundSupplier = await this.supplierRepo.findOneByOrFail({ id });
      return foundSupplier;
    } catch (error) {
      throw new NotFoundException('Supplier not found');
    }
  }

  async update(id: string, data: UpdateSupplierDto) {
    try {
      const foundSupplier = await this.findOne(id);
      Object.assign(foundSupplier, data);
      await this.supplierRepo.save(foundSupplier)
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Email is taken');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundSupplier = await this.findOne(id)
    if(!foundSupplier) throw new NotFoundException("Supplier not Found");
    return this.supplierRepo.remove(foundSupplier);
  }
}
