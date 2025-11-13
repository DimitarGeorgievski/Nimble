import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { roleShifts } from '../enums/shifts.enum';
import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { User } from 'src/users/entities/user.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;
  @Column({ name: 'end_time', type: 'timestamp', nullable: true })
  endTime: Date;
  @Column({ enum: roleShifts })
  role: roleShifts;
  @ManyToOne(() => BusinessLocation, (location) => location.shift)
  @JoinColumn({ name: 'business_locaion_id' })
  businessLocationId: BusinessLocation;
  @ManyToOne(() => Staff, (staff) => staff.shifts)
  @JoinColumn({ name: 'staff_id' })
  staff: Staff;
}
