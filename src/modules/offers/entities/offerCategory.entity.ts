import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

import {Offer} from './offer.entity';
import {CategoryPreview} from './categoryPreview.entity';

@Entity()
export class OfferCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(
        () => CategoryPreview,
        preview => preview.category,
    )
    previews: CategoryPreview[];

    @OneToMany(
        () => Offer,
        offer => offer.category,
    )
    offers: Offer[];
}
