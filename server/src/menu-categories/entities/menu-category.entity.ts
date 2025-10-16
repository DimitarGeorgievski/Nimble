import { Business } from 'src/business/entities/business.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { ServiceFee } from 'src/service-fee/entities/service-fee.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'menu_categories',
})
export class MenuCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string
  @ManyToOne(() => Tax, tax => tax.menuCategory, {nullable: true})
  @JoinColumn({
    name: "tax_fee_id"
  })
  taxId: Tax;
  @ManyToOne(() => ServiceFee, fee => fee.menuCategory, {nullable: true})
  @JoinColumn({
    name: "service_fee_id"
  })
  serviceFeeId: ServiceFee;
  @ManyToOne(() => Business, buisness => buisness.categories)
  @JoinColumn({
    name: "business_id",
  })
  buisnessId: Business;
  @OneToMany(() => MenuItem, item => item.categoryId)
  menuItem: MenuItem[];
}
