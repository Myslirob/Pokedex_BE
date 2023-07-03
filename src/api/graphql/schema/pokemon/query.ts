import { arg, idArg, inputObjectType, nonNull, objectType, stringArg } from 'nexus';
import { GraphQLError } from 'graphql/error';

import { Type } from '../../../../model/type';
import { Pokemon as PokemonEntity } from '../../../../model/pokemon';
import { Attack } from '../../../../model/attack';

import { Pokemon } from './types';

import type { Document } from 'mongoose';

new Attack();

export const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.field('pokemons', {
            type: PokemonConnection,
            args: {
                query: arg({ type: nonNull(PokemonsQueryInput) }),
            },
            resolve: async (source, { query }) => {
                // @todo There is duplicity code via project, but I didn't have time for find correct type with populated evolution and attacks in mongoose for isolate this code to map function
                const filter = {
                    ...(query.filter?.type === undefined ? {} : { types: query.filter?.type }),
                    ...(query.filter?.isFavorite === undefined ? {} : { isFavorite: query.filter.isFavorite === true }),
                    ...(query.search === undefined ? {} : { name: new RegExp(`.*${query.search}.*`, 'i') }),
                };
                const pokemons = await PokemonEntity.find(filter).sort('_id').skip(query.offset).limit(query.limit).populate<{
                    evolutions: Document<typeof Pokemon>[];
                    attacks: { special: Document<typeof Attack>[]; fast: Document<typeof Attack>[] };
                }>(['attacks.special', 'attacks.fast', 'evolutions']).exec();
                return {
                    count: pokemons.length,
                    edges: pokemons.map((pokemon) => {
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
                    }),
                    limit: query.limit,
                    offset: query.offset,
                };
            },
        });
        t.field('pokemonByName', {
            type: Pokemon,
            args: {
                name: nonNull(stringArg()),
            },
            resolve: async (source, args) => {
                // @todo There is duplicity code via project, but I didn't have time for find correct type with populated evolution and attacks in mongoose for isolate this code to map function
                const pokemon = await PokemonEntity.findOne({ name: args.name }).populate<{
                    evolutions: Document<typeof Pokemon>[];
                    attacks: { special: Document<typeof Attack>[]; fast: Document<typeof Attack>[] };
                }>(['attacks.special', 'attacks.fast', 'evolutions']).exec();
                if (pokemon === null) throw new GraphQLError(`Pokemon with name ${args.name} doesn't exist`, { extensions: { code: 'POKEMON_NOT_FOUND' } });
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
        t.field('pokemonById', {
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
        t.nonNull.list.nonNull.string('pokemonTypes', {
            resolve: async () => {
                const types = await Type.find().sort('name');
                const names = types.map((type) => type.name);
                return names;
            },
        });
    },
});

export const PokemonFilterInput = inputObjectType({
    name: 'PokemonFilterInput',
    definition(t) {
        t.string('type');
        t.boolean('isFavorite');
    },
});

export const PokemonsQueryInput = inputObjectType({
    name: 'PokemonsQueryInput',
    definition(t) {
        t.nonNull.int('limit', { default: 10 });
        t.nonNull.int('offset', { default: 0 });
        t.string('search', { });
        t.field('filter', { type: PokemonFilterInput });
    },
});

const PokemonConnection = objectType({
    name: 'PokemonConnection',
    definition(t) {
        t.nonNull.int('limit');
        t.nonNull.int('offset');
        t.nonNull.int('count');
        t.nonNull.list.nonNull.field('edges', { type: Pokemon });
    },
});
