import {
    Controller,
    Get,
    Post,
    Delete,
    Body,
    Put,
    Param,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import {OfferService} from './offer.service';
import {CreateCategoryDto, EditCategoryDto} from './dto/category.dto';
import {CreateOfferDto, UpdateOfferDto} from './dto/offers.dto';

@Controller('offer')
export class OfferController {
    constructor(private offerService: OfferService) {}

    @Get('/category/:categoryId/offers')
    async getOffersByCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
        return {data: {
            offers: await this.offerService.getOffersByCategory(categoryId),
        }};
    }

    @Post()
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        return {
            data: {
                offer: await this.offerService.saveOffer(createOfferDto),
            },
        };
    }

    @Delete('/:offerId')
    async deleteOffer(
        @Param('offerId', new ParseIntPipe()) offerId: number,
    ) {
        const deletionSuccess = await this.offerService.deleteOffer(offerId);

        return {data: {ok: deletionSuccess}};
    }

    @Put('/:offerId')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async updateOffer(
        @Param('offerId', new ParseIntPipe()) offerId: number,
        @Body() body: UpdateOfferDto,
    ) {
        return {data: {offer: await this.offerService.updateOffer(offerId, body)}};
    }

    @Get('/category/all')
    async getAllCategories() {
        return {data: {
            categories: await this.offerService.getCategories(),
        }};
    }

    @Post('/category')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return {data: {
            category: await this.offerService.saveOfferCategory(createCategoryDto),
        }};
    }

    @Delete('/category/:categoryId')
    async deleteCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
        const deletionSuccess = await this.offerService.deleteOfferCategory(categoryId);

        return {data: {ok: deletionSuccess}};
    }

    @Put('/category/:categoryId')
    async updateCategory(
        @Param('categoryId', new ParseIntPipe()) categoryId: number,
        @Body() body: EditCategoryDto,
    ) {
        const updatedCategory =
            await this.offerService.updateOfferCategory(categoryId, body.name);

        return {data: {category: updatedCategory}};
    }
}
