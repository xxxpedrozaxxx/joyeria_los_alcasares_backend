import { Request, Response, NextFunction } from 'express';
import { DireccionService } from '../../services/direccion.service';
import { CreateDireccionDto } from '../../dtos/direccion/create-direccion.dto';
import { UpdateDireccionDto } from '../../dtos/direccion/update-direccion.dto';

export class DireccionController {
    private readonly direccionService = new DireccionService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const direcciones = await this.direccionService.findAll();
            res.status(200).json(direcciones);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const direccion = await this.direccionService.findById(id);
            res.status(200).json(direccion);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const direccionData: CreateDireccionDto = req.body;
            const nuevaDireccion = await this.direccionService.create(direccionData);
            res.status(201).json(nuevaDireccion);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const direccionData: UpdateDireccionDto = req.body;
            const direccionActualizada = await this.direccionService.update(id, direccionData);
            res.status(200).json(direccionActualizada);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.direccionService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
