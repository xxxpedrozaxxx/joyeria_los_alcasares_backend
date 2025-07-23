import { Request, Response, NextFunction } from 'express';
import { NewslatterService } from '../../services/newslatter.service';
import { CreateNewslatterDto } from '../../dtos/newslatter.dto';

export class NewslatterController {
    private readonly newslatterService = new NewslatterService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateNewslatterDto = req.body;
            await this.newslatterService.create(data);
            res.status(200).json({ message: 'Correo almacenado exitosamente' });
        } catch (error) {
            next(error);
        }
    };
}
