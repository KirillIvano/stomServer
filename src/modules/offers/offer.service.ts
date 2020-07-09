import {
    Injectable,
    NotFoundException,
    ConflictException,
    BadRequestException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {getInsertedId} from '~/helpers/getInsertedId';

import {CreateOfferDto, UpdateOfferDto} from './dto/offers.dto';
import {Offer} from './entities/offer.entity';
import {CreateCategoryDto} from './dto/category.dto';
import {OfferCategory} from './entities/offerCategory.entity';
import {CategoryPreview} from './entities/categoryPreview.entity';
import {CreatePreviewDto, UpdatePreviewDto} from './dto/preview.dto';
import {deleteImage} from '~/services/images';

@Injectable()
export class OfferService {
    constructor(
        @InjectRepository(Offer) private offerRepository: Repository<Offer>,
        @InjectRepository(OfferCategory) private offerCategoryRepository: Repository<OfferCategory>,
        @InjectRepository(CategoryPreview) private categoryPreviewRepository: Repository<CategoryPreview>,
    ) {}

    async getOffersByCategory(categoryId: number) {
        const offerCategory = await this.offerCategoryRepository
            .findOne(
                categoryId,
                {relations: ['offers']},
            );

        if (!offerCategory) throw new NotFoundException('Категория не найдена');

        return {
            name: offerCategory.name,
            offers: offerCategory.offers,
        };
    }

    async saveOffer({categoryId, ...commonInfo}: CreateOfferDto): Promise<Offer> {
        const dbOffer = new Offer();
        Object.assign(dbOffer, commonInfo);

        const category = await this.offerCategoryRepository.findOne(categoryId);
        if (!category) throw new NotFoundException('Категория не найдена');

        dbOffer.category = category;

        const insertionResult = await this.offerRepository.insert(dbOffer);
        const id = getInsertedId(insertionResult);

        const createdOffer = await this.offerRepository.findOne(id);
        if (!createdOffer) throw new ConflictException('Произошло непредвиденное изменение данных');

        return createdOffer;
    }

    async updateOffer(offerId: number, updates: UpdateOfferDto): Promise<Offer> {
        const updateResult = await this.offerRepository.update(offerId, updates);
        if (updateResult.affected === 0) throw new BadRequestException('Ничего не было изменено');

        const updatedOffer = await this.offerRepository.findOne(offerId);
        if (!updatedOffer) throw new ConflictException('Непредвиденное изменение данных');

        return updatedOffer;
    }

    async deleteOffer(offerId: number) {
        const deletionResult = await this.offerRepository.delete({id: offerId});

        if (!deletionResult.affected) throw new BadRequestException('Не получилось удалить');
    }

    getCategories(): Promise<OfferCategory[]> {
        return this.offerCategoryRepository.find();
    }

    async saveOfferCategory(offerCategory: CreateCategoryDto): Promise<OfferCategory | undefined> {
        const insertionResult = await this.offerCategoryRepository.insert(offerCategory);
        const id = getInsertedId(insertionResult);

        const createdCategory = await this.offerCategoryRepository.findOne(id);
        if (!createdCategory) throw new ConflictException('Произошло непредвиденное изменение данных');

        return createdCategory;
    }

    async deleteOfferCategory(categoryId: number) {
        const deletionResult = await this.offerCategoryRepository.delete(categoryId);

        if (!deletionResult.affected) throw new BadRequestException('Не получилось удалить');
    }

    async updateOfferCategory(categoryId: number, name: string) {
        const updateResult = await this.offerCategoryRepository.update(categoryId, {name});
        if (updateResult.affected === 0) throw new BadRequestException('Ничего не было изменено');

        const updatedCategory = await this.offerCategoryRepository.findOne(categoryId);
        if (!updatedCategory) throw new ConflictException('Непредвиденное изменение данных');

        return updatedCategory;
    }

    async getCategoryPreviews(): Promise<CategoryPreview[]> {
        const previews = await this.categoryPreviewRepository.find();

        return previews;
    }

    async createCategoryPreview(data: CreatePreviewDto & {image: string}): Promise<CategoryPreview> {
        const {categoryId} = data;
        const category = this.offerCategoryRepository.findOne(categoryId);
        if (!category) throw new BadRequestException('Такой категории не существует');

        const preview = Object.assign(new CategoryPreview(), data);

        const insertionResult = await this.categoryPreviewRepository.insert(preview);
        const previewId = getInsertedId(insertionResult);

        const createdPreview = await this.categoryPreviewRepository.findOne(previewId);
        if (!createdPreview) throw new ConflictException('Произошло неожиданное изменение');

        return createdPreview;
    }

    async updateCategoryPreview(
        previewId: number,
        updates: UpdatePreviewDto,
    ): Promise<CategoryPreview> {
        const categoryPreview = await this.categoryPreviewRepository.findOne(previewId);
        if (!categoryPreview) throw new NotFoundException('Превью не было найдено');

        const {categoryId, ...restUpdates} = updates;

        if (categoryId) {
            const category = this.offerCategoryRepository.findOne(categoryId);
            if (!category) throw new BadRequestException('Такой категории не существует');

            categoryPreview.categoryId = categoryId;
        }

        Object.assign(categoryPreview, restUpdates);
        await this.categoryPreviewRepository.save(categoryPreview);

        return categoryPreview;
    }

    async updateCategoryPreviewImage(previewId: number, imageUrl: string): Promise<CategoryPreview> {
        const preview = await this.categoryPreviewRepository.findOne(previewId);
        if (!preview) throw new NotFoundException('Такое превью не найдено');

        preview.image = imageUrl;
        await this.categoryPreviewRepository.save(preview);

        return preview;
    }

    async deleteCategoryPreview(previewId: number) {
        const preview = await this.categoryPreviewRepository.findOne(previewId);
        if (!preview) throw new NotFoundException('Такой категории не найдено');

        const {image} = preview;
        deleteImage(image);

        const deletionResult = await this.categoryPreviewRepository.delete(previewId);

        if (!deletionResult.affected) throw new BadRequestException('Не получилось удалить');
    }
}
