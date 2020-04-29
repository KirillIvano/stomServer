import {IsString, IsNumber, IsInt, IsOptional} from 'class-validator';

export class CreateOfferDto {
    @IsString()
    name: string;
    @IsNumber()
    price: number;
    @IsInt()
    categoryId: number;
}

export class UpdateOfferDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number;
}
