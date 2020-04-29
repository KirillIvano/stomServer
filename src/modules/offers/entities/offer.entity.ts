import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import {
    OfferCategory,
} from './offerCategory.entity';

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => OfferCategory,
        category => category.offers,
        {onDelete: 'CASCADE'},
    )
    category: OfferCategory;
    @Column()
    name: string;
    @Column()
    price: number;
}
