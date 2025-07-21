import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Municipio } from '../entities/municipio.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateMunicipioDto } from '../dtos/municipio/create-municipio.dto';
import { UpdateMunicipioDto } from '../dtos/municipio/update-municipio.dto';

export class MunicipioService {
    private readonly municipioRepository: Repository<Municipio>;

    constructor() {
        this.municipioRepository = AppDataSource.getRepository(Municipio);
    }

    async findAll(): Promise<Municipio[]> {
        return this.municipioRepository.find({ relations: ['departamento', 'direcciones'] });
    }

    async findById(codigoMunicipio: string): Promise<Municipio> {
        const municipio = await this.municipioRepository.findOne({
            where: { codigoMunicipio },
            relations: ['departamento', 'direcciones'],
        });
        if (!municipio) throw new NotFoundException('Municipio no encontrado.');
        return municipio;
    }

    async create(data: CreateMunicipioDto): Promise<Municipio> {
        const nuevoMunicipio = this.municipioRepository.create(data);
        return this.municipioRepository.save(nuevoMunicipio);
    }

    async update(codigoMunicipio: string, data: UpdateMunicipioDto): Promise<Municipio> {
        const municipio = await this.findById(codigoMunicipio);
        this.municipioRepository.merge(municipio, data);
        return this.municipioRepository.save(municipio);
    }

    async remove(codigoMunicipio: string): Promise<void> {
        const resultado = await this.municipioRepository.delete(codigoMunicipio);
        if (resultado.affected === 0) throw new NotFoundException('Municipio no encontrado para eliminar.');
    }
}
