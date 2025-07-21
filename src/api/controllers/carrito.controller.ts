import { Request, Response, NextFunction } from 'express';
import { CarritoService } from '../../services/carrito.service';
import { CreateCarritoDto } from '../../dtos/carrito/create-carrito.dto';
import { UpdateCarritoDto } from '../../dtos/carrito/update-carrito.dto';

export class CarritoController {
    private readonly carritoService = new CarritoService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carritos = await this.carritoService.findAll();
            res.status(200).json(carritos);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const carrito = await this.carritoService.findById(id);
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

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const carritoData: UpdateCarritoDto = req.body;
            const carritoActualizado = await this.carritoService.update(id, carritoData);
            res.status(200).json(carritoActualizado);
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
