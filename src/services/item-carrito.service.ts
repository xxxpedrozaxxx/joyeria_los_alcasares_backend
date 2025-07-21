import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { ItemsCarrito } from '../entities/item-carrito.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateItemCarritoDto } from '../dtos/item-carrito/create-item-carrito.dto';
import { UpdateItemCarritoDto } from '../dtos/item-carrito/update-item-carrito.dto';

export class ItemCarritoService {
    private readonly itemCarritoRepository: Repository<ItemsCarrito>;

    constructor() {
        this.itemCarritoRepository = AppDataSource.getRepository(ItemsCarrito);
    }

    async findAll(): Promise<ItemsCarrito[]> {
        return this.itemCarritoRepository.find({ relations: ['carrito', 'producto'] });
    }

    async findById(id: string): Promise<ItemsCarrito> {
        const item = await this.itemCarritoRepository.findOne({
            where: { id },
            relations: ['carrito', 'producto'],
        });
        if (!item) throw new NotFoundException('Item de carrito no encontrado.');
        return item;
    }

    async create(data: CreateItemCarritoDto): Promise<ItemsCarrito> {
        const nuevoItem = this.itemCarritoRepository.create(data);
        return this.itemCarritoRepository.save(nuevoItem);
    }

    async update(id: string, data: UpdateItemCarritoDto): Promise<ItemsCarrito> {
        const item = await this.findById(id);
        this.itemCarritoRepository.merge(item, data);
        return this.itemCarritoRepository.save(item);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.itemCarritoRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Item de carrito no encontrado para eliminar.');
    }
}
