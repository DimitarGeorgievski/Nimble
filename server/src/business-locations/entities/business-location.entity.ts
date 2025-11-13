import { Business } from 'src/business/entities/business.entity';
import { InventoryStock } from 'src/inventory-stock/entities/inventory-stock.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { Staff } from 'src/staff/entities/staff.entity';
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
  @ManyToOne(() => Business, (business) => business.businessAddress, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'Business_id' })
  businessId: Business;
  @OneToMany(() => Table, (table) => table.businessLocationId)
  tables: Table[];
  @OneToMany(() => Order, (order) => order.businessLocationId)
  order: Order[];
  @OneToMany(() => MenuItem, (item) => item.categoryId)
  menuItem: MenuItem[];
  @OneToMany(() => Staff, (staff) => staff.businessLocationId)
  staff: Staff[];
  @OneToMany(() => InventoryStock, (stock) => stock.businessLocationId)
  inventoryStock: InventoryStock[];
  @OneToMany(() => Shift, (shift) => shift.businessLocationId)
  shift: Shift[];
}
