import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../../services/usuario.service';
import { CreateUsuarioDto } from '../../dtos/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../../dtos/usuario/update-usuario.dto';

export class UsuarioController {
    private readonly usuarioService = new UsuarioService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarios = await this.usuarioService.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    };

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const usuario = await this.usuarioService.findById(id);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    };

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarioData: CreateUsuarioDto = req.body;
            const nuevoUsuario = await this.usuarioService.create(usuarioData);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            next(error);
        }
    };

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const usuarioData: UpdateUsuarioDto = req.body;
            const usuarioActualizado = await this.usuarioService.update(id, usuarioData);
            res.status(200).json(usuarioActualizado);
        } catch (error) {
            next(error);
        }
    };

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.usuarioService.remove(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const usuario = await this.usuarioService.login(email, password);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    };
}
