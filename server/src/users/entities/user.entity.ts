import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { userStatus } from '../enum/user.enum';
import { Role } from 'src/roles/entities/role.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Shift } from 'src/shifts/entities/shift.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
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
  @Column({
    length: 20,
    unique: true,
    name: 'phone_number',
  })
  phoneNumber: string;
  @Column()
  password: string;
  @Column({ default: userStatus.ACTIVE, enum: userStatus })
  status: userStatus;
  @Column({
    default: 'assets/Nimble_logo.png',
    name: 'profile_image_url',
    type: 'text',
    nullable: true,
  })
  profileImageUrl: string;
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
  @OneToMany(() => Order, (order) => order.userId)
  order: Order[];
  @OneToMany(() => Shift, (shift) => shift.userId)
  shift: Shift[];
  @Exclude()
  @Column('text', {
    array: true,
    default: [],
    nullable: true,
  })
  refreshTokens: string[];
}
