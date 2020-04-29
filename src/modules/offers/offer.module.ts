import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {OfferController} from './offer.controller';
import {OfferService} from './offer.service';
import {Offer} from './entities/offer.entity';
import {OfferCategory} from './entities/offerCategory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Offer, OfferCategory])],
    controllers: [OfferController],
    providers: [OfferService],
})
export class OfferModule {}
