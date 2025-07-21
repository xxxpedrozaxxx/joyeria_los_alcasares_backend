import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateProveedorDto {
    @IsOptional()
    @IsString()
    nombre?: string;

    @IsOptional()
    @IsEmail({}, { message: 'El formato del email no es válido.' })
    emailContacto?: string;

    @IsOptional()
    @IsString()
    telefono?: string;
}
