import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateItemCarritoDto {
    @IsNotEmpty()
    carritoId!: string;

    @IsNotEmpty()
    productoId!: string;

    @IsInt()
    @Min(1)
    cantidad!: number;
}
