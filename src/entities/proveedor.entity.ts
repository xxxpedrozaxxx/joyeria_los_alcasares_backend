import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from "./producto.entity";

@Entity('proveedores')
export class Proveedor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 48, nullable: false })
    nombre!: string;

    @Column({ name: 'email_contacto', type: 'varchar', length: 48, nullable: true, unique: true })
    emailContacto!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono!: string;
    
    // Relaciones
    @OneToMany(() => Producto, (producto) => producto.proveedor)
    productos!: Producto[];
}