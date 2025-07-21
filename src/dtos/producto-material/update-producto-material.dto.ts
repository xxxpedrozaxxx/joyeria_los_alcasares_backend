import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductoMaterialDto {
    @IsOptional()
    @IsNumber()
    porcentaje?: number;

    @IsOptional()
    @IsString()
    notas?: string;
}
