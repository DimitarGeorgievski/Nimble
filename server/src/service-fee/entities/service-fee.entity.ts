import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { serviceFeeType } from '../enums/service-fee.enum';
import { MenuCategory } from 'src/menu-categories/entities/menu-category.entity';
import { Business } from 'src/business/entities/business.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';

@Entity({
  name: 'servie_fee',
})
export class ServiceFee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({
    enum: serviceFeeType,
  })
  type: serviceFeeType;
  @Column({ nullable: true })
  percent: number;
  @Column({ name: 'fixed_amount', nullable: true })
  fixedAmount: number;
  @Column({ name: 'is_default' })
  isDefault: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @OneToMany(() => MenuCategory, (category) => category.serviceFeeId)
  menuCategory: MenuCategory[];
  @OneToMany(() => Business, (buisness) => buisness.serviceFeeId)
  buisness: Business[];
  @OneToMany(() => OrderItem, (orderItem) => orderItem.serviceFeeId)
  orderItem: OrderItem[];
  @OneToMany(() => MenuItem, (item) => item.categoryId)
  menuItem: MenuItem[];
}
