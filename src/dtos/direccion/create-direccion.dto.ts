import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDireccionDto {
    @IsNotEmpty()
    @IsString()
    direccionLinea1!: string;

    @IsOptional()
    @IsString()
    direccionLinea2?: string;

    @IsOptional()
    @IsString()
    barrio?: string;

    @IsOptional()
    @IsString()
    codigoPostal?: string;

    @IsOptional()
    @IsBoolean()
    esPrincipal?: boolean;

    @IsNotEmpty()
    @IsString()
    nombreDestinatario!: string;

    @IsNotEmpty()
    @IsString()
    telefonoDestinatario!: string;

    @IsNotEmpty()
    usuarioId!: string;

    @IsNotEmpty()
    municipioId!: string;
}
