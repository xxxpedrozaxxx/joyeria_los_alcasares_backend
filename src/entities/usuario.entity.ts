import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm";
import { Role } from "./enums/rol.enum";
import { Direccion } from "./direccion.entity";
import { Pedido } from "./pedido.entity";
import { Resena } from "./resena.entity";
import { Carrito } from "./carrito.entity";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 48, nullable: false })
    nombre!: string;

    @Column({ type: 'varchar', length: 48, nullable: false })
    apellido!: string;

    @Column({ type: 'varchar', length: 48, nullable: false, unique: true })
    email!: string;

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefono!: string;

    @Column({ type: 'enum', enum: Role, default: Role.CLIENTE, nullable: false })
    rol!: Role;
    
    @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
    fechaCreacion!: Date;

    @UpdateDateColumn({ name: 'fecha_actualizacion', type: 'timestamp' })
    fechaActualizacion!: Date;

    // Relaciones
    @OneToMany(() => Direccion, (direccion) => direccion.usuario)
    direcciones!: Direccion[];

    @OneToMany(() => Pedido, (pedido) => pedido.usuario)
    pedidos!: Pedido[];

    @OneToMany(() => Resena, (resena) => resena.usuario)
    resenas!: Resena[];

    @OneToOne(() => Carrito, (carrito) => carrito.usuario)
    carrito!: Carrito;
}