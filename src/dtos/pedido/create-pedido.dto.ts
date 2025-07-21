import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { EstadoPedido } from '../../entities/enums/estado-pedido.enum';

export class CreatePedidoDto {
    @IsNotEmpty()
    usuarioId!: string;

    @IsNotEmpty()
    direccionEnvioId!: string;

    @IsEnum(EstadoPedido)
    estado!: EstadoPedido;

    @IsNumber()
    total!: number;
}
