import { IsString, IsNumber, Min, IsNotEmpty, IsInt, IsUUID, IsOptional } from 'class-validator';

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
    imagenUrl?: string;
    
    @IsNotEmpty({ message: 'El ID de la categoría es requerido.' })
    @IsInt()
    categoriaId!: number;

    @IsNotEmpty({ message: 'El ID del proveedor es requerido.' })
    @IsInt()
    proveedorId!: number;
}

// Para actualizar, usualmente los campos son opcionales
export class UpdateProductoDto {
    @IsOptional() @IsString() nombre?: string;
    @IsOptional() @IsString() descripcion?: string;
    @IsOptional() @IsNumber() @Min(0.01) precio?: number;
    @IsOptional() @IsString() garantia?: string;
    @IsOptional() @IsInt() @Min(0) stock?: number;
    @IsOptional() @IsString() imagenUrl?: string;
    @IsOptional() @IsInt() categoriaId?: number;
    @IsOptional() @IsInt() proveedorId?: number;
}