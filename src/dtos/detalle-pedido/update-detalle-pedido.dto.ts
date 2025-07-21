import { IsOptional, IsInt, Min, IsNumber } from 'class-validator';

export class UpdateDetallePedidoDto {
    @IsOptional()
    pedidoId?: string;

    @IsOptional()
    productoId?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    cantidad?: number;

    @IsOptional()
    @IsNumber()
    precioUnitario?: number;
}
