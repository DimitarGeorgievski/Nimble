import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { MenuCategory } from 'src/menu-categories/entities/menu-category.entity';
import { ServiceFee } from 'src/service-fee/entities/service-fee.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
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

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @OneToMany(() => BusinessLocation, (location) => location.address)
  businessAddress: BusinessLocation[];
  @OneToMany(() => MenuCategory, category => category.buisnessId)
  categories: MenuCategory[];
  @ManyToOne(() => Tax, tax => tax.business)
  @JoinColumn({name: "tax_id"})
  taxId: Tax;
  @ManyToOne(() => ServiceFee, serviceFee => serviceFee.buisness)
  @JoinColumn({name: "service_fee_id"})
  serviceFeeId: ServiceFee;
}
