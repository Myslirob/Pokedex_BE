import { idArg, nonNull, objectType } from 'nexus';
import { GraphQLError } from 'graphql/error';

import { Pokemon as PokemonEntity } from '../../../../model/pokemon';

import { Pokemon } from './types';

import type { Document } from 'mongoose';
import type { Attack } from '../../../../model/attack';

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.field('favoritePokemon', {
            type: Pokemon,
            args: {
                id: nonNull(idArg()),
            },
            resolve: async (source, args) => {
                // @todo There is duplicity code via project, but I didn't have time for find correct type with populated evolution and attacks in mongoose for isolate this code to map function
                const pokemon = await PokemonEntity.findById(args.id).populate<{
                    evolutions: Document<typeof Pokemon>[];
                    attacks: { special: Document<typeof Attack>[]; fast: Document<typeof Attack>[] };
                }>(['attacks.special', 'attacks.fast', 'evolutions']).exec();
                if (pokemon === null) throw new GraphQLError(`Pokemon with id ${args.id} doesn't exist`, { extensions: { code: 'POKEMON_NOT_FOUND' } });
                pokemon.isFavorite = true;
                await pokemon.save();
                const { _id, ...data } = pokemon.toObject();
                const attacks = {
                    fast: (pokemon.attacks?.fast ?? []).map((attack) => attack.toObject()),
                    special: (pokemon.attacks?.special ?? []).map((attack) => attack.toObject()),
                };
                return {
                    ...data,
                    id: _id,
                    attacks,
                    evolutions: pokemon.evolutions.map((evolution) => {
                        const { _id, ...data } = evolution.toObject();
                        return {
                            ...data,
                            id: _id,
                        };
                    }),
                };
            },
        });
        t.field('unFavoritePokemon', {
            type: Pokemon,
            args: {
                id: nonNull(idArg()),
            },
            resolve: async (source, args) => {
                // @todo There is duplicity code via project, but I didn't have time for find correct type with populated evolution and attacks in mongoose for isolate this code to map function
                const pokemon = await PokemonEntity.findById(args.id).populate<{
                    evolutions: Document<typeof Pokemon>[];
                    attacks: { special: Document<typeof Attack>[]; fast: Document<typeof Attack>[] };
                }>(['attacks.special', 'attacks.fast', 'evolutions']).exec();
                if (pokemon === null) throw new GraphQLError(`Pokemon with id ${args.id} doesn't exist`, { extensions: { code: 'POKEMON_NOT_FOUND' } });
                pokemon.isFavorite = false;
                await pokemon.save();
                const { _id, ...data } = pokemon.toObject();
                const attacks = {
                    fast: (pokemon.attacks?.fast ?? []).map((attack) => attack.toObject()),
                    special: (pokemon.attacks?.special ?? []).map((attack) => attack.toObject()),
                };
                return {
                    ...data,
                    id: _id,
                    attacks,
                    evolutions: pokemon.evolutions.map((evolution) => {
                        const { _id, ...data } = evolution.toObject();
                        return {
                            ...data,
                            id: _id,
                        };
                    }),
                };
            },
        });
    },
});
