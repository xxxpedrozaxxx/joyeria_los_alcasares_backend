import { IsNotEmpty } from 'class-validator';

export class CreateCarritoDto {
    @IsNotEmpty()
    usuarioId!: string;
}
