import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order_item.entity';
import { Repository } from 'typeorm';
import { DuplicateCodes } from 'src/duplicateCodes';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>
  ) {}
  async create(data: CreateOrderItemDto) {
    try {
      const foundOrderItem = await this.findOneByOrder(data.orderId);
      if (foundOrderItem)
        throw new BadRequestException('Order item with this order already exists');
      const newUser = await this.orderItemRepo.save({
        ...data,
        orderId: data.orderId ? { id: data.orderId } : undefined,
        menuItemId: data.menuItemId ? { id: data.menuItemId } : undefined,
        taxId: data.taxId ? { id: data.taxId } : undefined,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
      });
      return newUser;
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Order item with these informations already exist',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async findAll() {
    return await this.orderItemRepo.find({
      relations: {
        menuItemId: true,
        orderId: true,
        serviceFeeId: true,
        taxId: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const foundOrderItem = await this.orderItemRepo.findOneByOrFail({ id });
      return foundOrderItem;
    } catch (error) {
      throw new NotFoundException('Order item not found');
    }
  }
  async findOneByOrder(orderId?: string) {
    try {
      if (!orderId) return null;
      const foundOrderItem = await this.orderItemRepo.findOneOrFail({
        where: { orderId: { id: orderId } },
        relations: ['tableId', 'businessLocationId', 'userId'],
      });
      return foundOrderItem;
    } catch (error) {
      throw new NotFoundException('Order item not found');
    }
  }
  async update(id: string, data: UpdateOrderItemDto) {
    try {
      const foundOrderItem = await this.findOne(id);
      Object.assign(foundOrderItem, data);
      await this.orderItemRepo.save({
        ...data,
        orderId: data.orderId ? { id: data.orderId } : undefined,
        menuItemId: data.menuItemId ? { id: data.menuItemId } : undefined,
        taxId: data.taxId ? { id: data.taxId } : undefined,
        serviceFeeId: data.serviceFeeId ? { id: data.serviceFeeId } : undefined,
      });
    } catch (error) {
      if (error.code === DuplicateCodes.DUPLICATE_PG_CODE)
        throw new BadRequestException(
          'Got Issue with updating this order Item',
        );
      throw new InternalServerErrorException(error.messsage);
    }
  }

  async remove(id: string) {
    const foundOrderItem = await this.findOne(id);
    if (!foundOrderItem) throw new NotFoundException('Order Item not Found');
    return this.orderItemRepo.remove(foundOrderItem);
  }
}
