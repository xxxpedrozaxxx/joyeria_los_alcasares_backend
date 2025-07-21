import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMunicipioDto {
    @IsNotEmpty()
    @IsString()
    codigoMunicipio!: string;

    @IsNotEmpty()
    @IsString()
    nombreMpio!: string;

    @IsNotEmpty()
    departamentoId!: number;
}
