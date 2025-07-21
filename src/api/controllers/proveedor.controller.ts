import { Request, Response, NextFunction } from 'express';
import { ProveedorService } from '../../services/proveedor.service';
import { CreateProveedorDto } from '../../dtos/proveedor/create-proveedor.dto';
import { UpdateProveedorDto } from '../../dtos/proveedor/update-proveedor.dto';

export class ProveedorController {
    private readonly proveedorService = new ProveedorService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proveedores = await this.proveedorService.findAll();
            res.status(200).json(proveedores);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const proveedor = await this.proveedorService.findById(Number(id));
            res.status(200).json(proveedor);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proveedorData: CreateProveedorDto = req.body;
            const nuevoProveedor = await this.proveedorService.create(proveedorData);
            res.status(201).json(nuevoProveedor);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const proveedorData: UpdateProveedorDto = req.body;
            const proveedorActualizado = await this.proveedorService.update(Number(id), proveedorData);
            res.status(200).json(proveedorActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.proveedorService.remove(Number(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
