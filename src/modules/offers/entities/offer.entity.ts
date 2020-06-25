import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    RelationId,
} from 'typeorm';

import {OfferCategory} from './offerCategory.entity';
import {OfferPreview} from './offerPreview.entity';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => OfferCategory,
        category => category.offers,
        {onDelete: 'CASCADE'},
    )
    @JoinColumn({name: 'categoryId'})
    category: OfferCategory;

    @OneToMany(
        () => OfferPreview,
        preview => preview.offer,
    )
    previews: OfferPreview[];

    @Column()
    @RelationId((offer: Offer) => offer.category)
    categoryId: number;

    @Column()
    name: string;
    @Column()
    price: number;
}
