import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { ProductoMaterial } from '../entities/producto-material.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateProductoMaterialDto } from '../dtos/producto-material/create-producto-material.dto';
import { UpdateProductoMaterialDto } from '../dtos/producto-material/update-producto-material.dto';

export class ProductoMaterialService {
    private readonly productoMaterialRepository: Repository<ProductoMaterial>;

    constructor() {
        this.productoMaterialRepository = AppDataSource.getRepository(ProductoMaterial);
    }

    async findAll(): Promise<ProductoMaterial[]> {
        return this.productoMaterialRepository.find({ relations: ['producto', 'material'] });
    }

    async findById(productoId: string, materialId: number): Promise<ProductoMaterial> {
        const productoMaterial = await this.productoMaterialRepository.findOne({
            where: { productoId, materialId },
            relations: ['producto', 'material'],
        });
        if (!productoMaterial) throw new NotFoundException('ProductoMaterial no encontrado.');
        return productoMaterial;
    }

    async create(data: CreateProductoMaterialDto): Promise<ProductoMaterial> {
        const nuevoProductoMaterial = this.productoMaterialRepository.create(data);
        return this.productoMaterialRepository.save(nuevoProductoMaterial);
    }

    async update(productoId: string, materialId: number, data: UpdateProductoMaterialDto): Promise<ProductoMaterial> {
        const productoMaterial = await this.findById(productoId, materialId);
        this.productoMaterialRepository.merge(productoMaterial, data);
        return this.productoMaterialRepository.save(productoMaterial);
    }

    async remove(productoId: string, materialId: number): Promise<void> {
        const resultado = await this.productoMaterialRepository.delete({ productoId, materialId });
        if (resultado.affected === 0) throw new NotFoundException('ProductoMaterial no encontrado para eliminar.');
    }
}
