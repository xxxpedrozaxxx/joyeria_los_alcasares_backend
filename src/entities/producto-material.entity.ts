import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Material } from "./material.entity";

@Entity('producto_materiales')
export class ProductoMaterial {
    @PrimaryColumn({ name: 'producto_id' })
    productoId!: string;

    @PrimaryColumn({ name: 'material_id' })
    materialId!: number;

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    porcentaje!: number;
    
    @Column({ type: 'varchar', length: 100, nullable: true })
    notas!: string;
    
    // --- Relaciones ---
    @ManyToOne(() => Producto, (producto) => producto.productoMateriales)
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;

    @ManyToOne(() => Material, (material) => material.productoMateriales)
    @JoinColumn({ name: 'material_id' })
    material!: Material;
}