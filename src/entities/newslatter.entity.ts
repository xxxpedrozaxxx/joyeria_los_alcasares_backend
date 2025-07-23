import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('newslatter')
export class Newslatter {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 120, unique: true })
    correo!: string;
}
