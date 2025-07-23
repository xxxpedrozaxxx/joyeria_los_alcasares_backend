import { Request, Response, NextFunction } from 'express';
import { ContactoService } from '../../services/contacto.service';
import { CreateContactoDto } from '../../dtos/contacto.dto';

export class ContactoController {
    private readonly contactoService = new ContactoService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateContactoDto = req.body;
            await this.contactoService.create(data);
            res.status(200).json({ message: 'Mensaje almacenado exitosamente' });
        } catch (error) {
            next(error);
        }
    };
}
