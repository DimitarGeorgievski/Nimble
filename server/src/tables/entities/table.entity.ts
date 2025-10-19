import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { status } from '../enums/table.enum';
import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  number: number;
  @Column()
  zone: string;
  @Column({ enum: status })
  status: status;
  @ManyToOne(() => BusinessLocation, (location) => location.tables, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'business_location_id' })
  businessLocationId: BusinessLocation;
  @OneToMany(() => Order, order => order.tableId)
  order: Order[]
  @OneToMany(() => Reservation, (reservation) => reservation.tableId, {
    onDelete: 'CASCADE',
  })
  reservation: Reservation[];
}
