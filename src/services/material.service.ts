import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Material } from '../entities/material.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateMaterialDto } from '../dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../dtos/material/update-material.dto';

export class MaterialService {
    private readonly materialRepository: Repository<Material>;

    constructor() {
        this.materialRepository = AppDataSource.getRepository(Material);
    }

    async findAll(): Promise<Material[]> {
        return this.materialRepository.find({ relations: ['productoMateriales'] });
    }

    async findById(id: number): Promise<Material> {
        const material = await this.materialRepository.findOne({
            where: { id },
            relations: ['productoMateriales'],
        });
        if (!material) throw new NotFoundException('Material no encontrado.');
        return material;
    }

    async create(data: CreateMaterialDto): Promise<Material> {
        const nuevoMaterial = this.materialRepository.create(data);
        return this.materialRepository.save(nuevoMaterial);
    }

    async update(id: number, data: UpdateMaterialDto): Promise<Material> {
        const material = await this.findById(id);
        this.materialRepository.merge(material, data);
        return this.materialRepository.save(material);
    }

    async remove(id: number): Promise<void> {
        const resultado = await this.materialRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Material no encontrado para eliminar.');
    }
}
