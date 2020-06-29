import fs from 'fs';
import {promisify} from 'util';

import {IMAGES_PATH} from '~/settings/paths';

const deleteFile = promisify(fs.unlink);

const images = fs.readdirSync(IMAGES_PATH);

export const getImages = () => images;
export const saveImageName = (name: string) => images.push(name);
export const deleteImage = (fileName: string) => deleteFile(fileName);
