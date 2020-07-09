import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {getInsertedId} from '~/helpers/getInsertedId';
import {deleteImage} from '~/services/images';

import {CreateDoctorDto, UpdateDoctorInfoDto} from './dto/doctor.dto';
import {Doctor} from './entities/doctor.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor) private readonly doctorRepository: Repository<Doctor>,
    ) {}

    async getDoctorById(doctorId: number): Promise<Doctor | undefined> {
        return this.doctorRepository.findOne(doctorId);
    }

    async getDoctors(): Promise<Doctor[]> {
        const doctors = await this.doctorRepository.find();

        return doctors;
    }

    async createDoctor(data: CreateDoctorDto & {image: string}) {
        const doctor = Object.assign(new Doctor(), data);

        const doctorCreationResult = await this.doctorRepository.insert(doctor);
        const doctorId = getInsertedId(doctorCreationResult);

        const createdDoctor = await this.doctorRepository.findOne(doctorId);
        if (!createdDoctor) throw new ConflictException('Произошло непредвиденное изменение данных');

        return createdDoctor;
    }

    async deleteDoctor(doctorId: number) {
        const doctor = await this.doctorRepository.findOne(doctorId);
        if (!doctor) throw new BadRequestException('Не существует врача с таким id');

        const {image} = doctor;

        const doctorDeletionResult = await this.doctorRepository.delete(doctorId);
        if (!doctorDeletionResult.affected) throw new BadRequestException('Не получилось удалить');

        try {
            deleteImage(image);
        } catch {
            // eslint-disable-next-line no-console
            console.log('image deletion error');
        }
    }

    async updateDoctorInfo(doctorId: number, updates: UpdateDoctorInfoDto): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOne(doctorId);
        if (!doctor) throw new NotFoundException('Врач был не найден');

        const {name, info} = updates;

        if (name) doctor.name = name;
        if (info) doctor.info = info;

        await this.doctorRepository.save(doctor);

        return doctor;
    }

    async updateDoctorImage(doctorId: number, filename: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.findOne(doctorId);
        if (!doctor) throw new NotFoundException('Врач не найден');

        const prevFilename = doctor.image;
        doctor.image = filename;

        await this.doctorRepository.save(doctor);

        try {
            await deleteImage(prevFilename);
        } catch(e) {
            console.log(e);
            console.log('image deleting error');
        }

        return doctor;
    }
}
