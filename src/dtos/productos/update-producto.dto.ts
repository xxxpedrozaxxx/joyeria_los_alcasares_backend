import { IsString, IsNumber, Min, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class UpdateProductoDto {
    @IsOptional()
    @IsString()
    nombre?: string;
    
    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    @Min(0.01)
    precio?: number;
    
    @IsOptional()
    @IsString()
    garantia?: string;
    
    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    topSale?: boolean;
    
    @IsOptional()
    @IsInt()
    categoriaId?: number;

    @IsOptional()
    @IsInt()
    proveedorId?: number;
}
