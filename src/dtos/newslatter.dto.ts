import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateNewslatterDto {
    @IsNotEmpty()
    @IsEmail()
    correo!: string;
}
