import {IsString, IsNumber, IsInt, IsOptional} from 'class-validator';

export class CreateOfferDto {
    @IsString()
    name: string;
    @IsNumber()
    price: number;
    @IsInt()
    categoryId: number;
    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateOfferDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;
}
