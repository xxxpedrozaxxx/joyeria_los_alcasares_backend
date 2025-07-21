import { Repository } from 'typeorm';



import { CreateProductoDto, UpdateProductoDto } from '../dtos/productos/create-producto.dto';

import { AppDataSource } from '../config/data-source';
import { Producto } from '../entities/producto.entity';
import { Categoria } from '../entities/categoria.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { NotFoundException } from '../utils/exceptions';

export class ProductoService {
    private readonly productoRepository: Repository<Producto>;
    private readonly categoriaRepository: Repository<Categoria>;
    private readonly proveedorRepository: Repository<Proveedor>;

    constructor() {
        this.productoRepository = AppDataSource.getRepository(Producto);
        this.categoriaRepository = AppDataSource.getRepository(Categoria);
        this.proveedorRepository = AppDataSource.getRepository(Proveedor);
    }

    async findAll(): Promise<Producto[]> {
        // Usamos 'relations' para traer los datos de la categoría y el proveedor
        return this.productoRepository.find({ relations: ['categoria', 'proveedor'] });
    }

    async findById(id: string): Promise<Producto> {
        const producto = await this.productoRepository.findOne({
            where: { id },
            relations: ['categoria', 'proveedor', 'productoMateriales.material'], // Trae también los materiales
        });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado.');
        }
        return producto;
    }

    async create(data: CreateProductoDto): Promise<Producto> {
        // 1. Verificar que las entidades relacionadas (categoría y proveedor) existen
        const categoria = await this.categoriaRepository.findOneBy({ id: data.categoriaId });
        if (!categoria) throw new NotFoundException('La categoría especificada no existe.');

        const proveedor = await this.proveedorRepository.findOneBy({ id: data.proveedorId });
        if (!proveedor) throw new NotFoundException('El proveedor especificado no existe.');

        // 2. Crear la nueva instancia de producto
        const nuevoProducto = this.productoRepository.create({
            ...data,
            categoria: categoria, // Asignamos la entidad completa
            proveedor: proveedor, // Asignamos la entidad completa
        });

        return this.productoRepository.save(nuevoProducto);
    }
    
    async update(id: string, data: UpdateProductoDto): Promise<Producto> {
        const producto = await this.findById(id);
        
        // Si se provee un nuevo ID de categoría o proveedor, hay que buscarlos
        if (data.categoriaId) {
            const categoria = await this.categoriaRepository.findOneBy({ id: data.categoriaId });
            if (!categoria) throw new NotFoundException('La nueva categoría no existe.');
            producto.categoria = categoria;
        }

        if (data.proveedorId) {
            const proveedor = await this.proveedorRepository.findOneBy({ id: data.proveedorId });
            if (!proveedor) throw new NotFoundException('El nuevo proveedor no existe.');
            producto.proveedor = proveedor;
        }
        
        // Eliminamos los IDs del DTO para que no intenten sobrescribir las relaciones ya cargadas
        const { categoriaId, proveedorId, ...restOfData } = data;

        this.productoRepository.merge(producto, restOfData);

        return this.productoRepository.save(producto);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.productoRepository.delete(id);
        if (resultado.affected === 0) {
            throw new NotFoundException('Producto no encontrado para eliminar.');
        }
    }
}