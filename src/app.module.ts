import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {OfferModule} from './modules/offers/offer.module';
import {DoctorModule} from './modules/doctors/doctor.module';

@Module({
    imports: [
        OfferModule,
        DoctorModule,
        TypeOrmModule.forRoot({}),
    ],
    providers: [],
})
export class AppModule {}
