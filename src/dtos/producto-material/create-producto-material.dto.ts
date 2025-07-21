import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoMaterialDto {
    @IsNotEmpty()
    productoId!: string;

    @IsNotEmpty()
    materialId!: number;

    @IsOptional()
    @IsNumber()
    porcentaje?: number;

    @IsOptional()
    @IsString()
    notas?: string;
}
