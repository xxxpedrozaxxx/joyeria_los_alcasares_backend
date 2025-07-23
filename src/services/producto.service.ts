import { Repository } from 'typeorm';
import { CreateProductoDto } from '../dtos/productos/create-producto.dto';
import { UpdateProductoDto } from '../dtos/productos/update-producto.dto';
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
        return this.productoRepository.find({ relations: ['categoria', 'proveedor'] });
    }

    async findById(id: string): Promise<Producto> {
        const producto = await this.productoRepository.findOne({
            where: { id },
            relations: ['categoria', 'proveedor', 'productoMateriales.material'],
        });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado.');
        }
        return producto;
    }

    async create(data: CreateProductoDto): Promise<Producto> {
        const categoria = await this.categoriaRepository.findOne({ where: { id: data.categoriaId } });
        if (!categoria) throw new NotFoundException('La categoría especificada no existe.');

        const proveedor = await this.proveedorRepository.findOne({ where: { id: data.proveedorId } });
        if (!proveedor) throw new NotFoundException('El proveedor especificado no existe.');

        const productoData: Partial<Producto> = {
            ...data,
            imageUrl: data.imageUrl ?? '',
            topSale: data.topSale ?? false,
            categoria,
            proveedor,
            categoriaId: data.categoriaId,
            proveedorId: data.proveedorId,
        };

        const nuevoProducto = this.productoRepository.create(productoData);
        return this.productoRepository.save(nuevoProducto);
    }
    
    async update(id: string, data: UpdateProductoDto): Promise<Producto> {
        const producto = await this.findById(id);
        
        if (data.categoriaId) {
            const categoria = await this.categoriaRepository.findOne({ where: { id: data.categoriaId } });
            if (!categoria) throw new NotFoundException('La nueva categoría no existe.');
            producto.categoria = categoria;
            producto.categoriaId = data.categoriaId;
        }

        if (data.proveedorId) {
            const proveedor = await this.proveedorRepository.findOne({ where: { id: data.proveedorId } });
            if (!proveedor) throw new NotFoundException('El nuevo proveedor no existe.');
            producto.proveedor = proveedor;
            producto.proveedorId = data.proveedorId;
        }
        
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