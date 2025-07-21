import { Request, Response, NextFunction } from 'express';
import { DetallePedidoService } from '../../services/detalle-pedido.service';
import { CreateDetallePedidoDto } from '../../dtos/detalle-pedido/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from '../../dtos/detalle-pedido/update-detalle-pedido.dto';

export class DetallePedidoController {
    private readonly detallePedidoService = new DetallePedidoService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const detalles = await this.detallePedidoService.findAll();
            res.status(200).json(detalles);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const detalle = await this.detallePedidoService.findById(id);
            res.status(200).json(detalle);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const detalleData: CreateDetallePedidoDto = req.body;
            const nuevoDetalle = await this.detallePedidoService.create(detalleData);
            res.status(201).json(nuevoDetalle);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const detalleData: UpdateDetallePedidoDto = req.body;
            const detalleActualizado = await this.detallePedidoService.update(id, detalleData);
            res.status(200).json(detalleActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.detallePedidoService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
