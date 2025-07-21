import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Producto } from "./producto.entity";

@Entity('detalle_pedidos')
export class DetallePedido {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column('int', { nullable: false })
    cantidad!: number;
    
    @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2, nullable: false })
    precioUnitario!: number;
    
    // --- Relaciones ---
    @ManyToOne(() => Pedido, (pedido) => pedido.detalles, { nullable: false })
    @JoinColumn({ name: 'pedido_id' })
    pedido!: Pedido;
    
    @ManyToOne(() => Producto, (producto) => producto.detallePedidos, { nullable: false })
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;
}