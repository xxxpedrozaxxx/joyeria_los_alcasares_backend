import { IsString, IsNumber, Min, IsNotEmpty, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductoDto {
    @IsNotEmpty({ message: 'El nombre es requerido.' })
    @IsString()
    nombre!: string;
    
    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0.01)
    precio!: number;
    
    @IsOptional()
    @IsString()
    garantia?: string;
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock!: number;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    topSale?: boolean;
    
    @IsNotEmpty({ message: 'El ID de la categoría es requerido.' })
    @IsInt()
    categoriaId!: number;

    @IsNotEmpty({ message: 'El ID del proveedor es requerido.' })
    @IsInt()
    proveedorId!: number;
}