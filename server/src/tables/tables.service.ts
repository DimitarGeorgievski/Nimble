import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class TablesService {
  constructor(@InjectRepository(Table) private tableRepo: Repository<Table>) {}
  async create(data: CreateTableDto) {
    try {
      const foundTable = await this.findOneByNumber(data.number);
      if (foundTable)
        throw new BadRequestException('Table with this number already exists');
      const newTable = await this.tableRepo.save({
        ...data,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        order: data.order?.map((id) => ({ id })),
        reservation: data.reservation?.map((id) => ({ id })),
      });
      return newTable;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Table with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.tableRepo.find({
      relations: {
        businessLocationId: true,
      },
    });
  }
  async findAllTableOrders() {
    return await this.tableRepo.find({
      relations: {
        order: true,
      },
    });
  }
  async findAllTableReservations() {
    return await this.tableRepo.find({
      relations: {
        reservation: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundTable = await this.tableRepo.find({
        where: { id },
        relations: {
          businessLocationId: true,
        },
      });
      return foundTable;
    } catch (error) {
      throw new NotFoundException('Table not found');
    }
  }
  async findOneByNumber(number: number) {
    return this.tableRepo.findOneBy({ number });
  }

  async update(id: string, data: UpdateTableDto) {
    try {
      const foundTable = await this.tableRepo.findOne({
        where: { id },
        relations: ['order', 'reservation', 'businessLocationId'],
      });
      if (!foundTable) throw new NotFoundException('Table not found');
      Object.assign(foundTable, {
        ...data,
        id,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        order: data.order?.map((id) => ({ id })),
        reservation: data.reservation?.map((id) => ({ id })),
      });
      await this.tableRepo.save(foundTable);
    } catch (error) {
      console.log(error);
      if (error.code === DuplicateCodes)
        throw new BadRequestException('Got Issue with updating this table');

      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(number: number) {
    const foundTable = await this.findOneByNumber(number);
    if (!foundTable) throw new NotFoundException('Table not Found');
    return this.tableRepo.remove(foundTable);
  }
}
