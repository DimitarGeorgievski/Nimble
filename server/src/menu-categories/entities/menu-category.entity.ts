import { Business } from 'src/business/entities/business.entity';
import { ServiceFee } from 'src/service-fee/entities/service-fee.entity';
import { Tax } from 'src/taxes/entities/tax.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    name: "buisness_id",
  })
  buisnessId: Business;
}
