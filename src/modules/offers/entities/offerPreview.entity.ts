import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import {Offer} from './offer.entity';

@Entity()
export class OfferPreview {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => Offer,
        offer => offer.previews,
        {cascade: ['remove']},
    )
    @JoinColumn({name: 'offerId'})
    offer: Offer;

    @Column()
    name: string;
    @Column()
    image: string;
}
