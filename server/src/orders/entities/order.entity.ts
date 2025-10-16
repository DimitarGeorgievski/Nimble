import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { orderStatus } from '../enums/order.enum';
import { Table } from 'src/tables/entities/table.entity';
import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ enum: orderStatus })
  status: orderStatus;
  @Column({
    name: 'total_amount',
    type: "numeric"
  })
  totalAmount: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToOne(() => Table, table => table.order, {onDelete: "CASCADE"})
  @JoinColumn({name: "table_id"})
  tableId: Table
  @ManyToOne(() => BusinessLocation, businessLocation => businessLocation.order, {onDelete: "CASCADE"})
  @JoinColumn({name: "business_location_id"})
  businessLocationId: BusinessLocation
  @ManyToOne(() => User, user => user.order, {onDelete: "CASCADE"})
  @JoinColumn({name: "user_id"})
  userId: User;
  @OneToMany(() => OrderItem, orderItem => orderItem.orderId)
  orderItem: OrderItem[];
}
