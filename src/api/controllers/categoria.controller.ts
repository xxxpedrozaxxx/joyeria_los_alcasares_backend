import { Request, Response, NextFunction } from 'express';
import { CategoriaService } from '../../services/categoria.service';
import { CreateCategoriaDto } from '../../dtos/categoria/create-categoria.dto';
import { UpdateCategoriaDto } from '../../dtos/categoria/update-categoria.dto';

export class CategoriaController {
    private readonly categoriaService = new CategoriaService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categorias = await this.categoriaService.findAll();
            res.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoria = await this.categoriaService.findById(Number(id));
            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoriaData: CreateCategoriaDto = req.body;
            const nuevaCategoria = await this.categoriaService.create(categoriaData);
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const categoriaData: UpdateCategoriaDto = req.body;
            const categoriaActualizada = await this.categoriaService.update(Number(id), categoriaData);
            res.status(200).json(categoriaActualizada);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.categoriaService.remove(Number(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
