import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { MenuCategory } from 'src/menu-categories/entities/menu-category.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { ServiceFee } from 'src/service-fee/entities/service-fee.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'menu_items',
})
export class MenuItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({
    type: 'numeric',
  })
  price: number;
  @Column({
    default: true,
    name: 'is_active',
  })
  isActive: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToOne(() => MenuCategory, category => category.menuItem)
  @JoinColumn({name: "category_id"})
  categoryId: MenuCategory
  @ManyToOne(() => Tax, tax => tax.menuItem)
  @JoinColumn({name: "tax_fee_id"})
  taxFeeId: Tax
  @ManyToOne(() => ServiceFee, serviceFee => serviceFee.menuItem)
  @JoinColumn({name: "service_fee_id"})
  serviceFeeId: ServiceFee
  @ManyToOne(() => BusinessLocation, location => location.menuItem)
  @JoinColumn({name: "business_location_id"})
  businessLocationId: BusinessLocation
  @OneToMany(() => OrderItem, item => item.orderId)
  order: Order[]
}
