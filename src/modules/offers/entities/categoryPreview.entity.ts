import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    RelationId,
} from 'typeorm';
import {OfferCategory} from './offerCategory.entity';

@Entity()
export class CategoryPreview {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => OfferCategory,
        category => category.previews,
        {onDelete: 'CASCADE'},
    )
    @JoinColumn({name: 'categoryId'})
    category: OfferCategory;

    @Column()
    @RelationId((preview: CategoryPreview) => preview.category)
    categoryId: number;

    @Column()
    name: string;
    @Column()
    image: string;
}
