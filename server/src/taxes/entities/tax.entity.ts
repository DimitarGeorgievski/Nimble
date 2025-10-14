import { MenuCategory } from 'src/menu-categories/entities/menu-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { taxType } from '../enums/tax.enum';
import { Business } from 'src/business/entities/business.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';

@Entity()
export class Tax {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ enum: taxType})
  type: taxType;
  @Column({nullable: true})
  percent: number;
  @Column({ name: 'fixed_amount', nullable: true })
  fixedAmount: number;
  @Column({ name: 'is_default' })
  isDefault: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @OneToMany(() => MenuCategory, (category) => category.taxId)
  menuCategory: MenuCategory[];
  @OneToMany(() => Business, buisness => buisness.taxId)
  business: Business[]
  @OneToMany(() => OrderItem, orderItem => orderItem.tax)
  orderItem: OrderItem[]
}
