import { IsOptional } from 'class-validator';

export class UpdateCarritoDto {
    @IsOptional()
    usuarioId?: string;
}
