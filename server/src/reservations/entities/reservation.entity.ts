import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { reservationStatus } from '../enums/reservation.enum';
import { Table } from 'src/tables/entities/table.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'customer_name' })
  customerName: string;
  @Column({ name: 'customer_phone', nullable: true })
  customerPhone: string;
  @Column({ type: 'timestamp', name: 'reservation_time' })
  reservationTime: Date;
  @Column({ name: 'guest_count' })
  guestCount: number;
  @Column({ enum: reservationStatus })
  status: reservationStatus;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToOne(() => Table, table => table.reservation)
  @JoinColumn({name: "table_id"})
  tableId: Table
}
