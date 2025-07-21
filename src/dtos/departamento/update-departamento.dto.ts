import { IsString, IsOptional } from 'class-validator';

export class UpdateDepartamentoDto {
    @IsOptional()
    @IsString()
    nombreDepto?: string;
}
