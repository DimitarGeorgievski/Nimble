import { Order } from 'src/orders/entities/order.entity';
import { ServiceFee } from 'src/service-fee/entities/service-fee.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  quantity: number;
  @Column({
    name: 'custom_note',
  })
  customNotes: string;
  @ManyToOne(() => Order, (order) => order.orderItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;
//   @ManyToOne(() => Order, (order) => order.orderItem, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'order_item_id' })
//   order: Order;
  @ManyToOne(() => Tax, (tax) => tax.orderItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tax_fee_id' })
  tax: Tax;
  @ManyToOne(() => ServiceFee, (serviceFee) => serviceFee.orderItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_fee_id' })
  serviceFee: ServiceFee;
}
