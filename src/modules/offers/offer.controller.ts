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
import {CreateCategoryDto} from './dto/category.dto';
import {CreateOfferDto, UpdateOfferDto} from './dto/offers.dto';
import {Offer} from './entities/offer.entity';
import {OfferCategory} from './entities/offerCategory.entity';

@Controller('offer')
export class OfferController {
    constructor(private offerService: OfferService) {}

    @Get('/category/:categoryId/offers')
    getOffersByCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number): Promise<Offer[]> {
        return this.offerService.getOffersByCategory(categoryId);
    }

    @Post()
    createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
        return this.offerService.saveOffer(createOfferDto);
    }

    @Delete('/:offerId')
    async deleteOffer(@Param('offerId', new ParseIntPipe()) offerId: number): Promise<{success: boolean}> {
        const deletionSuccess = await this.offerService.deleteOffer(offerId);

        return {success: deletionSuccess};
    }

    @Put('/:offerId')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    updateOffer(
        @Param('offerId', new ParseIntPipe()) offerId: number,
        @Body() body: UpdateOfferDto,
    ) {
        return this.offerService.updateOffer(offerId, body);
    }

    @Get('/category/all')
    async getAllCategories(): Promise<OfferCategory[]> {
        return this.offerService.getCategories();
    }

    @Post('/category')
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.offerService.saveOfferCategory(createCategoryDto);
    }

    @Delete('/category/:categoryId')
    async deleteCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number): Promise<{success: boolean}> {
        const deletionSuccess = await this.offerService.deleteOfferCategory(categoryId);

        return {success: deletionSuccess};
    }
}
