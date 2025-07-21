import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Departamento } from '../entities/departamento.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateDepartamentoDto } from '../dtos/departamento/create-departamento.dto';
import { UpdateDepartamentoDto } from '../dtos/departamento/update-departamento.dto';

export class DepartamentoService {
    private readonly departamentoRepository: Repository<Departamento>;

    constructor() {
        this.departamentoRepository = AppDataSource.getRepository(Departamento);
    }

    async findAll(): Promise<Departamento[]> {
        return this.departamentoRepository.find({ relations: ['municipios'] });
    }

    async findById(id: number): Promise<Departamento> {
        const departamento = await this.departamentoRepository.findOne({
            where: { id },
            relations: ['municipios'],
        });
        if (!departamento) throw new NotFoundException('Departamento no encontrado.');
        return departamento;
    }

    async create(data: CreateDepartamentoDto): Promise<Departamento> {
        const nuevoDepartamento = this.departamentoRepository.create(data);
        return this.departamentoRepository.save(nuevoDepartamento);
    }

    async update(id: number, data: UpdateDepartamentoDto): Promise<Departamento> {
        const departamento = await this.findById(id);
        this.departamentoRepository.merge(departamento, data);
        return this.departamentoRepository.save(departamento);
    }

    async remove(id: number): Promise<void> {
        const resultado = await this.departamentoRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Departamento no encontrado para eliminar.');
    }
}
