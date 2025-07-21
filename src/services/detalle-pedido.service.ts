import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateDetallePedidoDto } from '../dtos/detalle-pedido/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from '../dtos/detalle-pedido/update-detalle-pedido.dto';

export class DetallePedidoService {
    private readonly detallePedidoRepository: Repository<DetallePedido>;

    constructor() {
        this.detallePedidoRepository = AppDataSource.getRepository(DetallePedido);
    }

    async findAll(): Promise<DetallePedido[]> {
        return this.detallePedidoRepository.find({ relations: ['pedido', 'producto'] });
    }

    async findById(id: string): Promise<DetallePedido> {
        const detalle = await this.detallePedidoRepository.findOne({
            where: { id },
            relations: ['pedido', 'producto'],
        });
        if (!detalle) throw new NotFoundException('Detalle de pedido no encontrado.');
        return detalle;
    }

    async create(data: CreateDetallePedidoDto): Promise<DetallePedido> {
        const nuevoDetalle = this.detallePedidoRepository.create(data);
        return this.detallePedidoRepository.save(nuevoDetalle);
    }

    async update(id: string, data: UpdateDetallePedidoDto): Promise<DetallePedido> {
        const detalle = await this.findById(id);
        this.detallePedidoRepository.merge(detalle, data);
        return this.detallePedidoRepository.save(detalle);
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.detallePedidoRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Detalle de pedido no encontrado para eliminar.');
    }
}
