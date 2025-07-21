import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from "./usuario.entity";
import { ItemsCarrito } from "./item-carrito.entity";

@Entity('carritos')
export class Carrito {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion!: Date;

    @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
    fechaActualizacion!: Date;

    // --- Relaciones ---
    @OneToOne(() => Usuario, (usuario) => usuario.carrito, { nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;
    
    @OneToMany(() => ItemsCarrito, (item) => item.carrito, { cascade: true })
    items!: ItemsCarrito[];
}