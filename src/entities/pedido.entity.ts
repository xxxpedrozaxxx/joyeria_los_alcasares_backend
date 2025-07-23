import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Direccion } from "./direccion.entity";
import { EstadoPedido } from "./enums/estado-pedido.enum";
import { DetallePedido } from "./detalle-pedido.entity";

@Entity('pedidos')
export class Pedido {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    fecha!: Date;
    
    @Column({ 
        type: 'enum', 
        enum: EstadoPedido, 
        default: EstadoPedido.PENDIENTE, 
        nullable: false 
    })
    estado!: EstadoPedido;
    
    @Column('decimal', { precision: 10, scale: 2, nullable: false })
    total!: number;
    
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion!: Date;

    @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
    fechaActualizacion!: Date;
    
    // --- Relaciones ---
    @ManyToOne(() => Usuario, (usuario) => usuario.pedidos, { nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;
    
    @Column({ name: 'direccion_envio', type: 'varchar', length: 255, nullable: false })
    direccionEnvio!: string;

    @OneToMany(() => DetallePedido, (detalle) => detalle.pedido, { cascade: true })
    detalles!: DetallePedido[];
}