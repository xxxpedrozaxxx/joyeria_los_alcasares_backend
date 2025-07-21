import { Request, Response, NextFunction } from 'express';
import { ProductoMaterialService } from '../../services/producto-material.service';
import { CreateProductoMaterialDto } from '../../dtos/producto-material/create-producto-material.dto';
import { UpdateProductoMaterialDto } from '../../dtos/producto-material/update-producto-material.dto';

export class ProductoMaterialController {
    private readonly productoMaterialService = new ProductoMaterialService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productosMaterial = await this.productoMaterialService.findAll();
            res.status(200).json(productosMaterial);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productoId, materialId } = req.params;
            const productoMaterial = await this.productoMaterialService.findById(productoId, Number(materialId));
            res.status(200).json(productoMaterial);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productoMaterialData: CreateProductoMaterialDto = req.body;
            const nuevoProductoMaterial = await this.productoMaterialService.create(productoMaterialData);
            res.status(201).json(nuevoProductoMaterial);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productoId, materialId } = req.params;
            const productoMaterialData: UpdateProductoMaterialDto = req.body;
            const productoMaterialActualizado = await this.productoMaterialService.update(productoId, Number(materialId), productoMaterialData);
            res.status(200).json(productoMaterialActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productoId, materialId } = req.params;
            await this.productoMaterialService.remove(productoId, Number(materialId));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
