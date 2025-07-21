import { IsString, IsEmail, Length, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../entities/enums/rol.enum';


export class CreateUsuarioDto {
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    @IsString()
    nombre!: string;

    @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
    @IsString()
    apellido!: string;
    
    @IsNotEmpty()
    @IsEmail({}, { message: 'El formato del email no es válido.' })
    email!: string;
    
    @IsNotEmpty()
    @Length(8, 20, { message: 'La contraseña debe tener entre 8 y 20 caracteres.' })
    password!: string;

    @IsOptional()
    @IsString()
    telefono?: string;

    @IsOptional()
    @IsEnum(Role)
    rol?: Role;
}