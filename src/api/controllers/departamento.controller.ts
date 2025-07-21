import { Request, Response, NextFunction } from 'express';
import { DepartamentoService } from '../../services/departamento.service';
import { CreateDepartamentoDto } from '../../dtos/departamento/create-departamento.dto';
import { UpdateDepartamentoDto } from '../../dtos/departamento/update-departamento.dto';

export class DepartamentoController {
    private readonly departamentoService = new DepartamentoService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departamentos = await this.departamentoService.findAll();
            res.status(200).json(departamentos);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const departamento = await this.departamentoService.findById(Number(id));
            res.status(200).json(departamento);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departamentoData: CreateDepartamentoDto = req.body;
            const nuevoDepartamento = await this.departamentoService.create(departamentoData);
            res.status(201).json(nuevoDepartamento);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const departamentoData: UpdateDepartamentoDto = req.body;
            const departamentoActualizado = await this.departamentoService.update(Number(id), departamentoData);
            res.status(200).json(departamentoActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.departamentoService.remove(Number(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
