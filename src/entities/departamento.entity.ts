import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Municipio } from "./municipio.entity";

@Entity('departamentos')
export class Departamento {
    @PrimaryColumn('int')
    id!: number;

    @Column({ name: 'nombre_depto', type: 'varchar', nullable: false })
    nombreDepto!: string;

    // Relaciones
    @OneToMany(() => Municipio, (municipio) => municipio.departamento)
    municipios!: Municipio[];
}