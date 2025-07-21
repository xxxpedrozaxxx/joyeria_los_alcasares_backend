import { Request, Response, NextFunction } from 'express';
import { PedidoService } from '../../services/pedido.service';
import { CreatePedidoDto } from '../../dtos/pedido/create-pedido.dto';
import { UpdatePedidoDto } from '../../dtos/pedido/update-pedido.dto';

export class PedidoController {
    private readonly pedidoService = new PedidoService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pedidos = await this.pedidoService.findAll();
            res.status(200).json(pedidos);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const pedido = await this.pedidoService.findById(id);
            res.status(200).json(pedido);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pedidoData: CreatePedidoDto = req.body;
            const nuevoPedido = await this.pedidoService.create(pedidoData);
            res.status(201).json(nuevoPedido);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const pedidoData: UpdatePedidoDto = req.body;
            const pedidoActualizado = await this.pedidoService.update(id, pedidoData);
            res.status(200).json(pedidoActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.pedidoService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
