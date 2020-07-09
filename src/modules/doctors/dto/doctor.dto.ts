import {Allow} from 'class-validator';

export class CreateDoctorDto {
    name: string;
    info: string;
}

export class DoctorPreviewDto {
    id: number;
    name: string;
}

export class UpdateDoctorInfoDto {
    @Allow()
    name?: string;
    @Allow()
    info?: string;
}
