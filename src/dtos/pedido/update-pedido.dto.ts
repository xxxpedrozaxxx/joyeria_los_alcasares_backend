import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { EstadoPedido } from '../../entities/enums/estado-pedido.enum';

export class UpdatePedidoDto {
    @IsOptional()
    usuarioId?: string;

    @IsOptional()
    direccionEnvioId?: string;

    @IsOptional()
    @IsEnum(EstadoPedido)
    estado?: EstadoPedido;

    @IsOptional()
    @IsNumber()
    total?: number;
}
