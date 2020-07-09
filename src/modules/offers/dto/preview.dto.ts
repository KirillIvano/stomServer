import {IsNotEmpty, IsOptional} from 'class-validator';

export class CreatePreviewDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    categoryId: number;
}

export class UpdatePreviewDto {
    @IsOptional()
    @IsNotEmpty()
    name?: string;
    @IsOptional()
    @IsNotEmpty()
    categoryId?: number;
}
