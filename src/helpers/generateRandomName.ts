import {randomBytes} from 'crypto';

export const generateRandomName = () =>
    randomBytes(16).toString('hex');
