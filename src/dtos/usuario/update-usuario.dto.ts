import { IsString, IsEmail, Length, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../entities/enums/rol.enum';

export class UpdateUsuarioDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsString()
    apellido?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El formato del email no es válido.' })
    email?: string;

    @IsOptional()
    @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres.' })
    password?: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsEnum(Role)
    rol?: Role;
}
