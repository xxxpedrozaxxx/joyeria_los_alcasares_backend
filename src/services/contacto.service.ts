import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Contacto } from '../entities/contacto.entity';
import { CreateContactoDto } from '../dtos/contacto.dto';

export class ContactoService {
    private readonly contactoRepository: Repository<Contacto>;

    constructor() {
        this.contactoRepository = AppDataSource.getRepository(Contacto);
    }

    async create(data: CreateContactoDto): Promise<void> {
        const entity = this.contactoRepository.create(data);
        await this.contactoRepository.save(entity);
    }
}
