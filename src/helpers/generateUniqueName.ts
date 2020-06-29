import {generateRandomName} from './generateRandomName';

export const generateUniqueName = (existingNames: string[]): string => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const probableName = generateRandomName();

        if (existingNames.indexOf(probableName) === -1) {
            return probableName;
        }
    }
};
