import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Carrito } from '../entities/carrito.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateCarritoDto } from '../dtos/carrito/create-carrito.dto';
import { UpdateCarritoDto } from '../dtos/carrito/update-carrito.dto';
import { Usuario } from '../entities/usuario.entity';
import { Producto } from '../entities/producto.entity';
import { ItemCarrito } from '../entities/item-carrito.entity';

export class CarritoService {
    private readonly carritoRepository: Repository<Carrito>;
    private readonly usuarioRepository: Repository<Usuario>;
    private readonly productoRepository: Repository<Producto>;
    private readonly itemCarritoRepository: Repository<ItemCarrito>;

    constructor() {
        this.carritoRepository = AppDataSource.getRepository(Carrito);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.productoRepository = AppDataSource.getRepository(Producto);
        this.itemCarritoRepository = AppDataSource.getRepository(ItemCarrito);
    }

    async findAll(): Promise<Carrito[]> {
        return this.carritoRepository.find({ relations: ['usuario', 'items', 'items.producto'] });
    }

    async findById(id: string): Promise<Carrito> {
        const carrito = await this.carritoRepository.findOne({
            where: { id },
            relations: ['usuario', 'items', 'items.producto'],
        });
        if (!carrito) throw new NotFoundException('Carrito no encontrado.');
        return carrito;
    }

    async findOrCreateByUsuarioId(usuarioId: string): Promise<Carrito> {
        let carrito = await this.carritoRepository.findOne({
            where: { usuario: { id: usuarioId } },
            relations: ['items', 'items.producto'],
        });

        if (!carrito) {
            const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
            if (!usuario) throw new NotFoundException('Usuario no encontrado.');
            
            const nuevoCarrito = this.carritoRepository.create({ usuario });
            carrito = await this.carritoRepository.save(nuevoCarrito);
        }

        return carrito;
    }

    async create(data: CreateCarritoDto): Promise<Carrito> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: data.usuarioId } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado para el carrito.');
        const nuevoCarrito = this.carritoRepository.create({ usuario });
        return await this.carritoRepository.save(nuevoCarrito);
    }

    async update(id: string, data: UpdateCarritoDto): Promise<Carrito> {
        const carrito = await this.findById(id);
        if (data.usuarioId) {
            const usuario = await this.usuarioRepository.findOne({ where: { id: data.usuarioId } });
            if (!usuario) throw new NotFoundException('Usuario no encontrado para el carrito.');
            carrito.usuario = usuario;
        }
        return await this.carritoRepository.save(carrito);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.carritoRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Carrito no encontrado para eliminar.');
    }

    async addItem(carritoId: string, productoId: string, cantidad: number): Promise<Carrito> {
        const carrito = await this.findById(carritoId);
        const producto = await this.productoRepository.findOne({ where: { id: productoId } });
        if (!producto) throw new NotFoundException('Producto no encontrado.');

        let item = await this.itemCarritoRepository.findOne({ where: { carrito: { id: carritoId }, producto: { id: productoId } } });
        
        if (item) {
            item.cantidad += cantidad;
        } else {
            item = this.itemCarritoRepository.create({ carrito, producto, cantidad });
        }
        await this.itemCarritoRepository.save(item);
        return this.findById(carritoId);
    }

    async removeItem(carritoId: string, itemId: string): Promise<Carrito> {
        const item = await this.itemCarritoRepository.findOne({ where: { id: itemId, carrito: { id: carritoId } } });
        if (!item) throw new NotFoundException('Producto no está en el carrito.');
        await this.itemCarritoRepository.remove(item);
        return this.findById(carritoId);
    }
}
