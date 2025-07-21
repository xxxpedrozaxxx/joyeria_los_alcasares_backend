import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateDireccionDto {
    @IsOptional()
    @IsString()
    direccionLinea1?: string;

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

    @IsOptional()
    @IsString()
    nombreDestinatario?: string;

    @IsOptional()
    @IsString()
    telefonoDestinatario?: string;

    @IsOptional()
    usuarioId?: string;

    @IsOptional()
    municipioId?: string;
}
