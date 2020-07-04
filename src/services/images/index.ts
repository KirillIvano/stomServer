import fs from 'fs';
import {promisify} from 'util';
import path from 'path';

import {IMAGES_PATH} from '~/settings/paths';

const deleteFile = promisify(fs.unlink);

const images = fs.readdirSync(IMAGES_PATH);

export const getImagePath = (fileName: string) => path.resolve(IMAGES_PATH, fileName);

export const getImages = () => images;
export const saveImageName = (name: string) => images.push(name);
export const deleteImage = (fileName: string) => deleteFile(getImagePath(fileName));
