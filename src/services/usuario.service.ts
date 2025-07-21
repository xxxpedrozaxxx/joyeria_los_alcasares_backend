import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/usuario.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateUsuarioDto } from '../dtos/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/usuario/update-usuario.dto';

export class UsuarioService {
    private readonly usuarioRepository: Repository<Usuario>;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({ relations: ['direcciones', 'pedidos', 'resenas', 'carrito'] });
    }

    async findById(id: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['direcciones', 'pedidos', 'resenas', 'carrito'],
        });
        if (!usuario) throw new NotFoundException('Usuario no encontrado.');
        return usuario;
    }

    async create(data: CreateUsuarioDto): Promise<Usuario> {
        const nuevoUsuario = this.usuarioRepository.create(data);
        return this.usuarioRepository.save(nuevoUsuario);
    }

    async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.findById(id);
        this.usuarioRepository.merge(usuario, data);
        return this.usuarioRepository.save(usuario);
    }

    async login(email: string, password: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado.');
        // Aquí deberías comparar el hash de la contraseña si usas hashing
        if (usuario.password !== password) {
            throw new NotFoundException('Contraseña incorrecta.');
        }
        return usuario;
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.usuarioRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Usuario no encontrado para eliminar.');
    }
}
