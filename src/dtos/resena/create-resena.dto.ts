import { IsInt, Min, Max, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateResenaDto {
    @IsInt()
    @Min(1)
    @Max(5)
    calificacion!: number;

    @IsOptional()
    @IsString()
    comentario?: string;

    @IsNotEmpty()
    usuarioId!: string;

    @IsNotEmpty()
    productoId!: string;
}
