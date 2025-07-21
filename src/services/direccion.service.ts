import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Direccion } from '../entities/direccion.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateDireccionDto } from '../dtos/direccion/create-direccion.dto';
import { UpdateDireccionDto } from '../dtos/direccion/update-direccion.dto';

export class DireccionService {
    private readonly direccionRepository: Repository<Direccion>;

    constructor() {
        this.direccionRepository = AppDataSource.getRepository(Direccion);
    }

    async findAll(): Promise<Direccion[]> {
        return this.direccionRepository.find({ relations: ['usuario', 'municipio'] });
    }

    async findById(id: string): Promise<Direccion> {
        const direccion = await this.direccionRepository.findOne({
            where: { id },
            relations: ['usuario', 'municipio'],
        });
        if (!direccion) throw new NotFoundException('Dirección no encontrada.');
        return direccion;
    }

    async create(data: CreateDireccionDto): Promise<Direccion> {
        const nuevaDireccion = this.direccionRepository.create(data);
        return this.direccionRepository.save(nuevaDireccion);
    }

    async update(id: string, data: UpdateDireccionDto): Promise<Direccion> {
        const direccion = await this.findById(id);
        this.direccionRepository.merge(direccion, data);
        return this.direccionRepository.save(direccion);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.direccionRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Dirección no encontrada para eliminar.');
    }
}
