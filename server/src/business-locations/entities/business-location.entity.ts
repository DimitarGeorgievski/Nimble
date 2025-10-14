import { Business } from 'src/business/entities/business.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Table } from 'src/tables/entities/table.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'buisness_location' })
export class BusinessLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  country: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToOne(() => Business, (business) => business.buisnessAdress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'Business_id' })
  business: Business;
  @OneToMany(() => Table, (table) => table.businessLocation)
  tables: Table[];
  @OneToMany(() => Order, (order) => order.businessLocation)
  order: Order[];
}
