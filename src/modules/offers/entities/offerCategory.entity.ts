import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Offer} from './offer.entity';

@Entity()
export class OfferCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany(
        () => Offer,
        offer => offer.category,
        {cascade: ['remove']},
    )
    offers: Offer[];
}
