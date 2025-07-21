import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Categoria } from "./categoria.entity";
import { Proveedor } from "./proveedor.entity";
import { ProductoMaterial } from "./producto-material.entity";
import { DetallePedido } from "./detalle-pedido.entity";
import { ItemsCarrito } from "./item-carrito.entity";
import { Resena } from "./resena.entity";

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 48, nullable: false })
    nombre!: string;

    @Column('text', { nullable: true })
    descripcion!: string;

    @Column('decimal', { precision: 18, scale: 2, nullable: false })
    precio!: number;

    @Column({ type: 'varchar', length: 48, nullable: true })
    garantia!: string;
    
    @Column('int', { nullable: false, default: 0 })
    stock!: number;
    
    @Column({ name: 'imagen_url', type: 'varchar', length: 255, nullable: true })
    imagenUrl!: string;
    
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion!: Date;

    @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
    fechaActualizacion!: Date;
    
    // --- Relaciones ---
    @ManyToOne(() => Categoria, (categoria) => categoria.productos, { nullable: false })
    @JoinColumn({ name: 'categoria_id' })
    categoria!: Categoria;
    
    @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos, { nullable: false })
    @JoinColumn({ name: 'proveedor_id' })
    proveedor!: Proveedor;

    @OneToMany(() => ProductoMaterial, (pm) => pm.producto)
    productoMateriales!: ProductoMaterial[];
    
    @OneToMany(() => DetallePedido, (detalle) => detalle.producto)
    detallePedidos!: DetallePedido[];

    @OneToMany(() => ItemsCarrito, (item) => item.producto)
    itemsCarrito!: ItemsCarrito[];

    @OneToMany(() => Resena, (resena) => resena.producto)
    resenas!: Resena[];
}