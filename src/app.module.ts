import { Module } from '@nestjs/common';
import {OfferModule} from './modules/offers/offer.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        OfferModule,
        TypeOrmModule.forRoot({}),
    ],
    providers: [],
})
export class AppModule {}
