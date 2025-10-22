import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';
import { table } from 'console';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}
  async create(data: CreateOrderDto) {
    try {
      const foundOrder = await this.findOneByTable(data.tableId);
      if (foundOrder)
        throw new BadRequestException('Order with this table already exists');
      const newUser = await this.orderRepo.save({
        ...data,
        tableId: data.tableId ? { id: data.tableId } : undefined,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        userId: data.userId ? { id: data.userId } : undefined,
        orderItem: data.orderItem?.map((id) => ({ id })),
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Order with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.orderRepo.find({
      relations: {
        businessLocationId: true,
        tableId: true,
        userId: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundOrder = await this.orderRepo.findOneByOrFail({ id });
      return foundOrder;
    } catch (error) {
      throw new NotFoundException('Order not found');
    }
  }
  async findOneByTable(tableId?: string) {
    try {
      if (!tableId) return null;
      const foundOrder = await this.orderRepo.findOneOrFail({
        where: { tableId: { id: tableId } },
        relations: ['tableId', 'businessLocationId', 'userId'],
      });
      return foundOrder;
    } catch (error) {
      throw new NotFoundException('Order not found');
    }
  }
  async findUserOrderItems(id: string) {
    return await this.orderRepo.find({
      where: { id },
      relations: {
        orderItem: true,
      },
    });
  }
  async update(id: string, data: UpdateOrderDto) {
    try {
      const foundOrder = await this.findOne(id);
      Object.assign(foundOrder, data);
      await this.orderRepo.save({
        ...data,
        tableId: data.tableId ? { id: data.tableId } : undefined,
        businessLocationId: data.businessLocationId
          ? { id: data.businessLocationId }
          : undefined,
        userId: data.userId ? { id: data.userId } : undefined,
        orderItem: data.orderItem?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException('Got Issue with updating this order');
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundOrder = await this.findOne(id);
    if (!foundOrder) throw new NotFoundException('Order not Found');
    return this.orderRepo.remove(foundOrder);
  }
}
