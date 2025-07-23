import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../entities/usuario.entity';
import { NotFoundException } from '../utils/exceptions';
import { CreateUsuarioDto } from '../dtos/usuario/create-usuario.dto';
import { UpdateUsuarioDto } from '../dtos/usuario/update-usuario.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        const { password, ...rest } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = this.usuarioRepository.create({ ...rest, password: hashedPassword });
        return this.usuarioRepository.save(nuevoUsuario);
    }

    async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
        const usuario = await this.findById(id);
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        this.usuarioRepository.merge(usuario, data);
        return this.usuarioRepository.save(usuario);
    }

    async login(email: string, password: string): Promise<{ token: string; usuario: Usuario }> {
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) throw new NotFoundException('Usuario no encontrado.');

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            throw new NotFoundException('Contraseña incorrecta.');
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '48h',
        });

        return { token, usuario };
    }

    async remove(id: string): Promise<void> {
        const resultado = await this.usuarioRepository.delete(id);
        if (resultado.affected === 0) throw new NotFoundException('Usuario no encontrado para eliminar.');
    }
}
