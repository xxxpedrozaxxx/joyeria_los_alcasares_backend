import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePedidoDto {
    @IsNotEmpty()
    usuarioId!: string;

    @IsNotEmpty()
    direccionEnvio!: string;


    @IsNotEmpty()
    carritoId!: string;

    @IsNumber()
    total!: number;
}
