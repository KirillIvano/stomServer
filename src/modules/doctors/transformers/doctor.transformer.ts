import {Doctor} from './../entities/doctor.entity';
import {DoctorPreviewDto} from './../dto/doctor.dto';

export const getDoctorPreview = ({id, name}: Doctor): DoctorPreviewDto => ({
    id,
    name,
});
