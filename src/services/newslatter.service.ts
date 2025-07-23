import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Newslatter } from '../entities/newslatter.entity';
import { CreateNewslatterDto } from '../dtos/newslatter.dto';

export class NewslatterService {
    private readonly newslatterRepository: Repository<Newslatter>;

    constructor() {
        this.newslatterRepository = AppDataSource.getRepository(Newslatter);
    }

    async create(data: CreateNewslatterDto): Promise<void> {
        const entity = this.newslatterRepository.create(data);
        await this.newslatterRepository.save(entity);
    }
}
