import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Resena } from '../entities/resena.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateResenaDto } from '../dtos/resena/create-resena.dto';
import { UpdateResenaDto } from '../dtos/resena/update-resena.dto';

export class ResenaService {
    private readonly resenaRepository: Repository<Resena>;

    constructor() {
        this.resenaRepository = AppDataSource.getRepository(Resena);
    }

    async findAll(): Promise<Resena[]> {
        return this.resenaRepository.find({ relations: ['usuario', 'producto'] });
    }

    async findById(id: string): Promise<Resena> {
        const resena = await this.resenaRepository.findOne({
            where: { id },
            relations: ['usuario', 'producto'],
        });
        if (!resena) throw new NotFoundException('Reseña no encontrada.');
        return resena;
    }

    async create(data: CreateResenaDto): Promise<Resena> {
        const nuevaResena = this.resenaRepository.create(data);
        return this.resenaRepository.save(nuevaResena);
    }

    async update(id: string, data: UpdateResenaDto): Promise<Resena> {
        const resena = await this.findById(id);
        this.resenaRepository.merge(resena, data);
        return this.resenaRepository.save(resena);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.resenaRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Reseña no encontrada para eliminar.');
    }
}
