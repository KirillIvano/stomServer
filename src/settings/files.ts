import {diskStorage} from 'multer';
import path from 'path';
import {MulterOptions} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import {generateUniqueName} from '~/helpers/generateUniqueName';
import {getImages, saveImageName} from '~/services/images';
import {IMAGES_PATH} from './paths';

export const multerImagesOptions: MulterOptions = {
    storage: diskStorage({
        destination: IMAGES_PATH,
        filename: (_, file, cb) => {
            const existingImages = getImages();

            const fileExtension = path.extname(file.originalname);
            const fileName = generateUniqueName(existingImages);

            const fileFullName = `${fileName}${fileExtension}`;

            saveImageName(fileFullName);

            return cb(null, fileFullName);
        },
    }),
};
