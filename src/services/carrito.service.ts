import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Carrito } from '../entities/carrito.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateCarritoDto } from '../dtos/carrito/create-carrito.dto';
import { UpdateCarritoDto } from '../dtos/carrito/update-carrito.dto';

export class CarritoService {
    private readonly carritoRepository: Repository<Carrito>;

    constructor() {
        this.carritoRepository = AppDataSource.getRepository(Carrito);
    }

    async findAll(): Promise<Carrito[]> {
        return this.carritoRepository.find({ relations: ['usuario', 'items'] });
    }

    async findById(id: string): Promise<Carrito> {
        const carrito = await this.carritoRepository.findOne({
            where: { id },
            relations: ['usuario', 'items'],
        });
        if (!carrito) throw new NotFoundException('Carrito no encontrado.');
        return carrito;
    }

    async create(data: CreateCarritoDto): Promise<Carrito> {
        // Buscar el usuario por ID y asociarlo al carrito
        const usuarioRepo = AppDataSource.getRepository(require('../entities/usuario.entity').Usuario);
        const usuario = await usuarioRepo.findOne({ where: { id: data.usuarioId } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado para el carrito.');
        const nuevoCarrito = this.carritoRepository.create({ usuario });
        return await this.carritoRepository.save(nuevoCarrito);
    }

    async update(id: string, data: UpdateCarritoDto): Promise<Carrito> {
        const carrito = await this.findById(id);
        if (data.usuarioId) {
            const { Usuario } = require('../entities/usuario.entity');
            const usuarioRepo = AppDataSource.getRepository(Usuario);
            const usuario = await usuarioRepo.findOne({ where: { id: data.usuarioId } });
            if (!usuario) throw new NotFoundException('Usuario no encontrado para el carrito.');
            carrito.usuario = usuario as import('../entities/usuario.entity').Usuario;
        }
        return await this.carritoRepository.save(carrito);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.carritoRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Carrito no encontrado para eliminar.');
    }

    async addItem(carritoId: string, productoId: string, cantidad: number): Promise<Carrito> {
        const carrito = await this.findById(carritoId);
        const productoRepo = AppDataSource.getRepository(require('../entities/producto.entity').Producto);
        const producto = await productoRepo.findOne({ where: { id: productoId } });
        if (!producto) throw new NotFoundException('Producto no encontrado.');
        const itemCarritoRepo = AppDataSource.getRepository(require('../entities/item-carrito.entity').ItemCarrito);
        let item = await itemCarritoRepo.findOne({ where: { carrito: { id: carritoId }, producto: { id: productoId } } });
        if (item) {
            item.cantidad += cantidad;
        } else {
            item = itemCarritoRepo.create({ carrito, producto, cantidad });
        }
        await itemCarritoRepo.save(item);
        return this.findById(carritoId);
    }

    async removeItem(carritoId: string, productoId: string): Promise<Carrito> {
        const carrito = await this.findById(carritoId);
        const itemCarritoRepo = AppDataSource.getRepository(require('../entities/item-carrito.entity').ItemCarrito);
        const item = await itemCarritoRepo.findOne({ where: { carrito: { id: carritoId }, producto: { id: productoId } } });
        if (!item) throw new NotFoundException('Producto no está en el carrito.');
        await itemCarritoRepo.remove(item);
        return this.findById(carritoId);
    }
}
