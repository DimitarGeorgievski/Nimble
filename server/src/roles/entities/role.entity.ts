import { Staff } from "src/staff/entities/staff.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column({
        type: "varchar",
        length: 100,
    })
    name: string;
    @Column({
        type: "text",
        nullable: true,
    })
    description: string;
    @CreateDateColumn({
        name: "created_at"
    })
    createdAt: Date;
    @UpdateDateColumn({
        name: "updated_at"
    })
    updatedAt: Date;
    @ManyToMany(() => Staff, user => user.roles)
    staff: Staff[]
}
