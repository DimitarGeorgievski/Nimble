import { BusinessLocation } from 'src/business-locations/entities/business-location.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'inventory_stock' })
export class InventoryStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'item_name' })
  itemName: string;
  @Column()
  quantity: number;
  @Column()
  unit: string;
  @Column({ type: 'numeric', name: 'min_threshold' })
  minThreshold: number;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
  @ManyToOne(() => BusinessLocation, location => location.inventoryStock)
  @JoinColumn({name: "busines_location_id"})
  businessLocationId: BusinessLocation
}
