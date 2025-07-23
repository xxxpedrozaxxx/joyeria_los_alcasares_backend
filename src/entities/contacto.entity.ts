import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('contacto')
export class Contacto {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 80 })
    nombre!: string;

    @Column({ type: 'varchar', length: 120 })
    correo!: string;

    @Column({ type: 'text' })
    mensaje!: string;
}
