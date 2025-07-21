import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index, Check } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Producto } from "./producto.entity";

@Entity('resenas')
@Index('idx_usuario_producto_resena_unica', ['usuario', 'producto'], { unique: true })
@Check(`"calificacion" >= 1 AND "calificacion" <= 5`)
export class Resena {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('int', { nullable: false })
    calificacion!: number;

    @Column('text', { nullable: true })
    comentario!: string;
    
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion!: Date;

    // --- Relaciones ---
    @ManyToOne(() => Usuario, (usuario) => usuario.resenas, { nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

    @ManyToOne(() => Producto, (producto) => producto.resenas, { nullable: false })
    @JoinColumn({ name: 'producto_id' })
    producto!: Producto;
}