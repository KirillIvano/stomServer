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
    UseInterceptors,
    UploadedFile,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';

import {generateResponse} from '~/helpers/generateResponse';
import {multerImagesOptions} from '~/settings/files';
import {File} from '~/entities/file';
import {PasswordGuard} from '~/guards/auth.guard';

import {OfferService} from './offer.service';
import {CreateCategoryDto, EditCategoryDto} from './dto/category.dto';
import {CreateOfferDto, UpdateOfferDto} from './dto/offers.dto';
import {CreatePreviewDto, UpdatePreviewDto} from './dto/preview.dto';

@Controller('offer')
export class OfferController {
    constructor(private offerService: OfferService) {}

    @Get('/all')
    async getAllOffers() {
        return generateResponse({offers: await this.offerService.getAllOffers(), name: 'Все'});
    }

    @UseGuards(PasswordGuard)
    @Post()
    async createOffer(@Body() createOfferDto: CreateOfferDto) {
        return generateResponse({
            offer: await this.offerService.saveOffer(createOfferDto),
        });
    }

    @UseGuards(PasswordGuard)
    @Delete('/:offerId')
    async deleteOffer(
        @Param('offerId', new ParseIntPipe()) offerId: number,
    ) {
        const deletionSuccess = await this.offerService.deleteOffer(offerId);

        return generateResponse({ok: deletionSuccess});
    }

    @UseGuards(PasswordGuard)
    @Put('/:offerId')
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async updateOffer(
        @Param('offerId', new ParseIntPipe()) offerId: number,
        @Body() body: UpdateOfferDto,
    ) {
        return generateResponse({offer: await this.offerService.updateOffer(offerId, body)});
    }

    @Get('/category/all')
    async getAllCategories() {
        return generateResponse({
            categories: await this.offerService.getCategories(),
        });
    }
    @Get('/category/:categoryId')
    async getOffersByCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
        return {data: await this.offerService.getOffersByCategory(categoryId)};
    }

    @UseGuards(PasswordGuard)
    @Post('/category')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return generateResponse({
            category: await this.offerService.saveOfferCategory(createCategoryDto),
        });
    }

    @UseGuards(PasswordGuard)
    @Delete('/category/:categoryId')
    async deleteCategory(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
        const deletionSuccess = await this.offerService.deleteOfferCategory(categoryId);

        return generateResponse({ok: deletionSuccess});
    }

    @UseGuards(PasswordGuard)
    @Put('/category/:categoryId')
    async updateCategory(
        @Param('categoryId', new ParseIntPipe()) categoryId: number,
        @Body() body: EditCategoryDto,
    ) {
        const updatedCategory =
            await this.offerService.updateOfferCategory(categoryId, body.name);

        return generateResponse({category: updatedCategory});
    }

    @Get('preview')
    async getCategoryPreviews() {
        const previews = await this.offerService.getCategoryPreviews();

        return generateResponse({previews});
    }

    @UseGuards(PasswordGuard)
    @Delete('/preview/:previewId')
    async deleteCategoryPreview(
        @Param('previewId', new ParseIntPipe()) previewId: number,
    ) {
        await this.offerService.deleteCategoryPreview(previewId);

        return generateResponse({});
    }

    @UseGuards(PasswordGuard)
    @Put('/preview/:previewId')
    async updateCategoryPreview(
        @Param('previewId', new ParseIntPipe()) previewId: number,
        @Body() body: UpdatePreviewDto,
    ) {
        const preview = await this.offerService.updateCategoryPreview(
            previewId,
            body,
        );

        return generateResponse({preview});
    }

    @UseGuards(PasswordGuard)
    @Put('/preview/:previewId/image')
    @UseInterceptors(
        FileInterceptor(
            'image',
            multerImagesOptions,
        ),
    )
    async updateCategoryPreviewImage(
        @UploadedFile() image: File,
        @Param('previewId', new ParseIntPipe()) previewId: number,
    ) {
        if (!image) throw new BadRequestException('Картинка обязательна');

        const updatedPreview = await this.offerService.updateCategoryPreviewImage(previewId, image.filename);

        return generateResponse({
            preview: updatedPreview,
        });
    }

    @UseGuards(PasswordGuard)
    @Post('preview')
    @UseInterceptors(
        FileInterceptor(
            'image',
            multerImagesOptions,
        ),
    )
    async createCategoryPreview(
        @UploadedFile() image: File,
        @Body() createPreviewDto: CreatePreviewDto,
    ) {
        if (!image) throw new BadRequestException('Картинка обязательна');

        return generateResponse({
            preview: await this.offerService.createCategoryPreview(
                Object.assign(createPreviewDto, {image: image.filename}),
            ),
        });
    }

}
