import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    RelationId,
} from 'typeorm';

import {OfferCategory} from './offerCategory.entity';

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

    @Column()
    @RelationId((offer: Offer) => offer.category)
    categoryId: number;

    @Column()
    name: string;
    @Column()
    price: number;
    @Column({nullable: true})
    description: string;
}
