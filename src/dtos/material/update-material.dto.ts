import { IsString, IsOptional } from 'class-validator';

export class UpdateMaterialDto {
    @IsOptional()
    @IsString()
    nombre?: string;
}
