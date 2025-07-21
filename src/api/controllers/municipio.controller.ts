import { Request, Response, NextFunction } from 'express';
import { MunicipioService } from '../../services/municipio.service';
import { CreateMunicipioDto } from '../../dtos/municipio/create-municipio.dto';
import { UpdateMunicipioDto } from '../../dtos/municipio/update-municipio.dto';

export class MunicipioController {
    private readonly municipioService = new MunicipioService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const municipios = await this.municipioService.findAll();
            res.status(200).json(municipios);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { codigoMunicipio } = req.params;
            const municipio = await this.municipioService.findById(codigoMunicipio);
            res.status(200).json(municipio);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const municipioData: CreateMunicipioDto = req.body;
            const nuevoMunicipio = await this.municipioService.create(municipioData);
            res.status(201).json(nuevoMunicipio);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { codigoMunicipio } = req.params;
            const municipioData: UpdateMunicipioDto = req.body;
            const municipioActualizado = await this.municipioService.update(codigoMunicipio, municipioData);
            res.status(200).json(municipioActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { codigoMunicipio } = req.params;
            await this.municipioService.remove(codigoMunicipio);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
