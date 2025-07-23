import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactoDto {
    @IsNotEmpty()
    nombre!: string;

    @IsNotEmpty()
    @IsEmail()
    correo!: string;

    @IsNotEmpty()
    mensaje!: string;
}
