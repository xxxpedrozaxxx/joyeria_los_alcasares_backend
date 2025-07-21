import { Request, Response, NextFunction } from 'express';
import { ItemCarritoService } from '../../services/item-carrito.service';
import { CreateItemCarritoDto } from '../../dtos/item-carrito/create-item-carrito.dto';
import { UpdateItemCarritoDto } from '../../dtos/item-carrito/update-item-carrito.dto';

export class ItemCarritoController {
    private readonly itemCarritoService = new ItemCarritoService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items = await this.itemCarritoService.findAll();
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const item = await this.itemCarritoService.findById(id);
            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemData: CreateItemCarritoDto = req.body;
            const nuevoItem = await this.itemCarritoService.create(itemData);
            res.status(201).json(nuevoItem);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const itemData: UpdateItemCarritoDto = req.body;
            const itemActualizado = await this.itemCarritoService.update(id, itemData);
            res.status(200).json(itemActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.itemCarritoService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
