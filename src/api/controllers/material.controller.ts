import { Request, Response, NextFunction } from 'express';
import { MaterialService } from '../../services/material.service';
import { CreateMaterialDto } from '../../dtos/material/create-material.dto';
import { UpdateMaterialDto } from '../../dtos/material/update-material.dto';

export class MaterialController {
    private readonly materialService = new MaterialService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const materiales = await this.materialService.findAll();
            res.status(200).json(materiales);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const material = await this.materialService.findById(Number(id));
            res.status(200).json(material);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const materialData: CreateMaterialDto = req.body;
            const nuevoMaterial = await this.materialService.create(materialData);
            res.status(201).json(nuevoMaterial);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const materialData: UpdateMaterialDto = req.body;
            const materialActualizado = await this.materialService.update(Number(id), materialData);
            res.status(200).json(materialActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.materialService.remove(Number(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
