import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductoMaterial } from "./producto-material.entity";

@Entity('materiales')
export class Material {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    nombre!: string;

    // Relaciones
    @OneToMany(() => ProductoMaterial, (pm) => pm.material)
    productoMateriales!: ProductoMaterial[];
}