import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Departamento } from "./departamento.entity";
import { Direccion } from "./direccion.entity";

@Entity('municipios')
export class Municipio {
    @PrimaryColumn({ name: 'codigo_municipio', type: 'varchar' })
    codigoMunicipio!: string;

    @Column({ name: 'nombre_mpio', type: 'varchar', nullable: false })
    nombreMpio!: string;

    // Relaciones
    @ManyToOne(() => Departamento, (dpto) => dpto.municipios, { nullable: false })
    @JoinColumn({ name: 'departamento_id' })
    departamento!: Departamento;

    @OneToMany(() => Direccion, (direccion) => direccion.municipio)
    direcciones!: Direccion[];
}