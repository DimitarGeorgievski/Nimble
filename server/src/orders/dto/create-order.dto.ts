import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { orderStatus } from '../enums/order.enum';

export class CreateOrderDto {
  @IsEnum(orderStatus)
  status: orderStatus;
  @IsNumber()
  totalAmount: number;
  @IsUUID('4')
  @IsOptional()
  tableId?: string;
  @IsUUID('4')
  @IsOptional()
  businessLocationId?: string;
  @IsUUID('4')
  @IsOptional()
  userId?: string;
  @IsUUID('4')
  @IsOptional()
  orderItem?: string;
}
