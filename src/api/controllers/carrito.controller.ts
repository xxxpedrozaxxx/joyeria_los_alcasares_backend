import { Request, Response, NextFunction } from 'express';
import { CarritoService } from '../../services/carrito.service';
import { CreateCarritoDto } from '../../dtos/carrito/create-carrito.dto';
import { UpdateCarritoDto } from '../../dtos/carrito/update-carrito.dto';

export class CarritoController {
    private readonly carritoService = new CarritoService();

    public getByUsuarioId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { usuarioId } = req.params;
            const carrito = await this.carritoService.findOrCreateByUsuarioId(usuarioId);
            res.status(200).json(carrito);
        } catch (error) {
            next(error);
        }
    };

    public addItemToCarrito = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { carritoId } = req.params;
            const { productoId, cantidad } = req.body;
            const carrito = await this.carritoService.addItem(carritoId, productoId, cantidad);
            res.status(200).json(carrito);
        } catch (error) {
            next(error);
        }
    };

    public removeItemFromCarrito = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { carritoId, itemId } = req.params;
            const carrito = await this.carritoService.removeItem(carritoId, itemId);
            res.status(200).json(carrito);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carritoData: CreateCarritoDto = req.body;
            const nuevoCarrito = await this.carritoService.create(carritoData);
            res.status(201).json(nuevoCarrito);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.carritoService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
