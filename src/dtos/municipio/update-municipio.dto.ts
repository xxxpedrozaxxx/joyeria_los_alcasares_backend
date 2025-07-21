import { IsString, IsOptional } from 'class-validator';

export class UpdateMunicipioDto {
    @IsOptional()
    @IsString()
    nombreMpio?: string;

    @IsOptional()
    departamentoId?: number;
}
