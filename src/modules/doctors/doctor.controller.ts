import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Put,
    Param,
    ParseIntPipe,
    ValidationPipe,
    UseInterceptors,
    UploadedFile,
    UseGuards,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';

import {File} from '~/entities/file';
import {multerImagesOptions} from '~/settings/files';
import {generateResponse} from '~/helpers/generateResponse';
import {PasswordGuard} from '~/guards/auth.guard';

import {CreateDoctorDto, UpdateDoctorInfoDto} from './dto/doctor.dto';
import {DoctorService} from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(private doctorService: DoctorService) {}

    @Get()
    async getDoctors() {
        return generateResponse({
            doctors: await this.doctorService.getDoctors(),
        });
    }

    @UseGuards(PasswordGuard)
    @Delete('/:doctorId')
    async deleteDoctor(@Param('doctorId', new ParseIntPipe()) doctorId: number) {
        await this.doctorService.deleteDoctor(doctorId);

        return generateResponse({});
    }

    @UseGuards(PasswordGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor(
            'image',
            multerImagesOptions,
        ),
    )
    async createDoctor(
        @UploadedFile() image: File,
        @Body() createDoctorDto: CreateDoctorDto,
    ) {
        return generateResponse({
            doctor: await this.doctorService.createDoctor(
                Object.assign(createDoctorDto, {image: image.filename}),
            ),
        });
    }

    @UseGuards(PasswordGuard)
    @Put('/:doctorId')
    async updateDoctorInfo(
        @Param('doctorId', new ParseIntPipe()) doctorId: number,
        @Body(new ValidationPipe({whitelist: true})) updateInfoDto: UpdateDoctorInfoDto,
    ) {
        const updatedDoctor = await this.doctorService.updateDoctorInfo(doctorId, updateInfoDto);

        return generateResponse({doctor: updatedDoctor});
    }

    @UseGuards(PasswordGuard)
    @Put('/:doctorId/image')
    @UseInterceptors(
        FileInterceptor(
            'image',
            multerImagesOptions,
        ),
    )
    async updateDoctorImage(
        @Param('doctorId', new ParseIntPipe()) doctorId: number,
        @UploadedFile() image: File,
    ) {
        const updatedDoctor =
            await this.doctorService.updateDoctorImage(doctorId, image.filename);

        return generateResponse({doctor: updatedDoctor});
    }
}
