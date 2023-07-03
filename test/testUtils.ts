import type { Response } from 'supertest';

export const toResponseObject = (response: Response) => {
    return {
        status: response.status,
        body: response.body,
    };
};

let id = 1;

export function getNextPokemonId() {
    return `${id++}`.padStart(3, '0');
}
