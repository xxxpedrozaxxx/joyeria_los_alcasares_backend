import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Municipio } from "./municipio.entity";

@Entity('direcciones')
export class Direccion {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'direccion_linea_1', type: 'varchar', nullable: false })
    direccionLinea1!: string;

    @Column({ name: 'direccion_linea_2', type: 'varchar', nullable: true })
    direccionLinea2!: string;

    @Column({ type: 'varchar', nullable: true })
    barrio!: string;
    
    @Column({ name: 'codigo_postal', type: 'varchar', nullable: true })
    codigoPostal!: string;

    @Column({ name: 'es_principal', type: 'boolean', default: false })
    esPrincipal!: boolean;
    
    @Column({ name: 'nombre_destinatario', type: 'varchar', nullable: false })
    nombreDestinatario!: string;

    @Column({ name: 'telefono_destinatario', type: 'varchar', nullable: false })
    telefonoDestinatario!: string;
    
    // --- Relaciones ---
    @ManyToOne(() => Usuario, (usuario) => usuario.direcciones, { nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;
    
    @ManyToOne(() => Municipio, (municipio) => municipio.direcciones, { nullable: false })
    @JoinColumn({ name: 'municipio_id' })
    municipio!: Municipio;
}