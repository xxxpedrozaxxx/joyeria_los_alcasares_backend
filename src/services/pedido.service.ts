import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Pedido } from '../entities/pedido.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreatePedidoDto } from '../dtos/pedido/create-pedido.dto';
import { UpdatePedidoDto } from '../dtos/pedido/update-pedido.dto';

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
        const nuevoPedido = this.pedidoRepository.create(data);
        return this.pedidoRepository.save(nuevoPedido);
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
