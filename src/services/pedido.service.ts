import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Pedido } from '../entities/pedido.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreatePedidoDto } from '../dtos/pedido/create-pedido.dto';
import { UpdatePedidoDto } from '../dtos/pedido/update-pedido.dto';
import { Usuario } from '../entities/usuario.entity';
import { Carrito } from '../entities/carrito.entity';
import { ItemCarrito } from '../entities/item-carrito.entity';
import { DetallePedido } from '../entities/detalle-pedido.entity';

export class PedidoService {
    private readonly pedidoRepository: Repository<Pedido>;

    constructor() {
        this.pedidoRepository = AppDataSource.getRepository(Pedido);
    }

    async findAll(): Promise<Pedido[]> {
        return this.pedidoRepository.find({ relations: ['usuario', 'direccionEnvio', 'detalles'] });
    }

    async findById(id: string): Promise<Pedido> {
        const pedido = await this.pedidoRepository.findOne({
            where: { id },
            relations: ['usuario', 'direccionEnvio', 'detalles'],
        });
        if (!pedido) throw new NotFoundException('Pedido no encontrado.');
        return pedido;
    }

    async create(data: CreatePedidoDto): Promise<Pedido> {
        const usuarioRepo = AppDataSource.getRepository(Usuario);
        const carritoRepo = AppDataSource.getRepository(Carrito);
        const itemCarritoRepo = AppDataSource.getRepository(ItemCarrito);
        const detallePedidoRepo = AppDataSource.getRepository(DetallePedido);

        const usuario = await usuarioRepo.findOne({ where: { id: data.usuarioId } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado.');


        const carrito = await carritoRepo.findOne({ where: { id: data.carritoId }, relations: ['items', 'items.producto'] });
        if (!carrito) throw new NotFoundException('Carrito no encontrado.');
        if (!carrito.items || carrito.items.length === 0) throw new NotFoundException('El carrito está vacío.');

        // Crear detalles de pedido a partir de los items del carrito
        const detalles: DetallePedido[] = [];
        for (const item of carrito.items) {
            const detalle = detallePedidoRepo.create({
                cantidad: item.cantidad,
                precioUnitario: item.producto.precio,
                producto: item.producto,
            });
            detalles.push(detalle);
        }

        const pedido = this.pedidoRepository.create({
            usuario,
            direccionEnvio: data.direccionEnvio,
            total: data.total,
            detalles,
        });
        const pedidoGuardado = await this.pedidoRepository.save(pedido);

        // Vaciar el carrito
        await itemCarritoRepo.remove(carrito.items);

        return pedidoGuardado;
    }

    async update(id: string, data: UpdatePedidoDto): Promise<Pedido> {
        const pedido = await this.findById(id);
        this.pedidoRepository.merge(pedido, data);
        return this.pedidoRepository.save(pedido);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.pedidoRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Pedido no encontrado para eliminar.');
    }
}
