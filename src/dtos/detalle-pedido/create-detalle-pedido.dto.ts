import { IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateDetallePedidoDto {
    @IsNotEmpty()
    pedidoId!: string;

    @IsNotEmpty()
    productoId!: string;

    @IsInt()
    @Min(1)
    cantidad!: number;

    @IsNumber()
    precioUnitario!: number;
}
