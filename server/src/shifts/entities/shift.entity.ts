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

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;
  @Column({ name: 'end_time', type: 'timestamp', nullable: true })
  endTime: Date;
  @Column({ enum: roleShifts })
  role: roleShifts;
  @ManyToOne(() => BusinessLocation, (location) => location.shift)
  @JoinColumn({ name: 'business_locaion_id' })
  businessLocationId: BusinessLocation;
  @ManyToOne(() => User, (user) => user.shift)
  @JoinColumn({ name: 'user_id' })
  userId: User;
}
