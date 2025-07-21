import { Request, Response, NextFunction } from 'express';
import { ResenaService } from '../../services/resena.service';
import { CreateResenaDto } from '../../dtos/resena/create-resena.dto';
import { UpdateResenaDto } from '../../dtos/resena/update-resena.dto';

export class ResenaController {
    private readonly resenaService = new ResenaService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resenas = await this.resenaService.findAll();
            res.status(200).json(resenas);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const resena = await this.resenaService.findById(id);
            res.status(200).json(resena);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const resenaData: CreateResenaDto = req.body;
            const nuevaResena = await this.resenaService.create(resenaData);
            res.status(201).json(nuevaResena);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const resenaData: UpdateResenaDto = req.body;
            const resenaActualizada = await this.resenaService.update(id, resenaData);
            res.status(200).json(resenaActualizada);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.resenaService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
