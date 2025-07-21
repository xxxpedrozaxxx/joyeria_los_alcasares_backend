import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateItemCarritoDto {
    @IsOptional()
    carritoId?: string;

    @IsOptional()
    productoId?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    cantidad?: number;
}
