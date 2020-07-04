import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ServeStaticModule} from '@nestjs/serve-static';
import path from 'path';

import {OfferModule} from './modules/offers/offer.module';
import {DoctorModule} from './modules/doctors/doctor.module';

@Module({
    imports: [
        OfferModule,
        DoctorModule,
        TypeOrmModule.forRoot({}),

        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '..', 'imagesHost'),
            serveRoot: '/images/',
        }),
    ],
    providers: [],
})
export class AppModule {}
