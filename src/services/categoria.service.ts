import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Categoria } from '../entities/categoria.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateCategoriaDto } from '../dtos/categoria/create-categoria.dto';
import { UpdateCategoriaDto } from '../dtos/categoria/update-categoria.dto';

export class CategoriaService {
    private readonly categoriaRepository: Repository<Categoria>;

    constructor() {
        this.categoriaRepository = AppDataSource.getRepository(Categoria);
    }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({ relations: ['productos'] });
    }

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations: ['productos'],
        });
        if (!categoria) throw new NotFoundException('Categoría no encontrada.');
        return categoria;
    }

    async create(data: CreateCategoriaDto): Promise<Categoria> {
        const nuevaCategoria = this.categoriaRepository.create(data);
        return this.categoriaRepository.save(nuevaCategoria);
    }

    async update(id: number, data: UpdateCategoriaDto): Promise<Categoria> {
        const categoria = await this.findById(id);
        this.categoriaRepository.merge(categoria, data);
        return this.categoriaRepository.save(categoria);
    }

    async remove(id: number): Promise<void> {
        const resultado = await this.categoriaRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Categoría no encontrada para eliminar.');
    }
}
