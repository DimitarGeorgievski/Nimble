import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { User } from 'src/users/entities/user.entity';
import { userStatus } from 'src/users/enum/user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { staffGender } from '../enums/staff.enum';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 100,
    name: 'first_name',
  })
  firstName: string;
  @Column({
    length: 100,
    name: 'last_name',
  })
  lastName: string;
  @Column({
    length: 150,
    unique: true,
  })
  email: string;
  @Column({ enum: staffGender })
  gender: staffGender;
  @Column({
    length: 20,
    unique: true,
    name: 'phone_number',
  })
  phoneNumber: string;
  @Column({ default: userStatus.ACTIVE, enum: userStatus })
  status?: userStatus;
  @Column()
  color: string;
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(() => Order, (order) => order.staff)
  orders: Order[];
  @OneToMany(() => Shift, (shift) => shift.staff)
  shifts: Shift[];
  @ManyToOne(() => BusinessLocation, (location) => location.staff)
  @JoinColumn({ name: 'business_locaion_id' })
  businessLocationId: BusinessLocation;
  @ManyToMany(() => Role, (role) => role.staff)
  @JoinTable({
    name: 'staff_roles',
    joinColumn: { name: 'staff_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
