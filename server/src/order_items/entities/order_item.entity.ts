import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
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
  orderId: Order;
  @ManyToOne(() => MenuItem, (order) => order.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_item_id' })
  menuItemId: MenuItem;
  @ManyToOne(() => Tax, (tax) => tax.orderItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tax_fee_id' })
  taxId: Tax;
  @ManyToOne(() => ServiceFee, (serviceFee) => serviceFee.orderItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_fee_id' })
  serviceFeeId: ServiceFee;
}
