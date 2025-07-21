import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Producto } from "./producto.entity";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 48, nullable: false, unique: true })
    nombre!: string;
    
    @Column('text', { nullable: true })
    descripcion!: string;

    // Relaciones
    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos!: Producto[];
}