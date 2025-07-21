import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Proveedor } from '../entities/proveedor.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateProveedorDto } from '../dtos/proveedor/create-proveedor.dto';
import { UpdateProveedorDto } from '../dtos/proveedor/update-proveedor.dto';

export class ProveedorService {
    private readonly proveedorRepository: Repository<Proveedor>;

    constructor() {
        this.proveedorRepository = AppDataSource.getRepository(Proveedor);
    }

    async findAll(): Promise<Proveedor[]> {
        return this.proveedorRepository.find({ relations: ['productos'] });
    }

    async findById(id: number): Promise<Proveedor> {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id },
            relations: ['productos'],
        });
        if (!proveedor) throw new NotFoundException('Proveedor no encontrado.');
        return proveedor;
    }

    async create(data: CreateProveedorDto): Promise<Proveedor> {
        const nuevoProveedor = this.proveedorRepository.create(data);
        return this.proveedorRepository.save(nuevoProveedor);
    }

    async update(id: number, data: UpdateProveedorDto): Promise<Proveedor> {
        const proveedor = await this.findById(id);
        this.proveedorRepository.merge(proveedor, data);
        return this.proveedorRepository.save(proveedor);
    }

    async remove(id: number): Promise<void> {
        const resultado = await this.proveedorRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Proveedor no encontrado para eliminar.');
    }
}
