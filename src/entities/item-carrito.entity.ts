import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { Carrito } from "./carrito.entity";
import { Producto } from "./producto.entity";

@Entity('items_carrito')
@Index('idx_carrito_producto_unico', ['carrito', 'producto'], { unique: true })
export class ItemsCarrito {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('int', { nullable: false, default: 1 })
    cantidad!: number;
    
    // --- Relaciones ---
    @ManyToOne(() => Carrito, (carrito) => carrito.items, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'carrito_id' })
    carrito!: Carrito;
    
    @ManyToOne(() => Producto, (producto) => producto.itemsCarrito, { nullable: false })
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;
}