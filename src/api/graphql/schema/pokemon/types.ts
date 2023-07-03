import { objectType } from 'nexus';

export const Attack = objectType({
    name: 'Attack',
    definition(t) {
        t.nonNull.string('name');
        t.nonNull.string('type');
        t.nonNull.int('damage');
    },
});
export const Pokemon = objectType({
    name: 'Pokemon',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('name');
        t.nonNull.field('weight', { type: PokemonDimension });
        t.nonNull.field('height', { type: PokemonDimension });
        t.nonNull.string('classification');
        t.nonNull.list.nonNull.string('types');
        t.nonNull.list.nonNull.string('resistant');
        t.nonNull.field('attacks', { type: PokemonAttack });
        t.nonNull.list.nonNull.string('weaknesses');
        t.nonNull.float('fleeRate');
        t.nonNull.int('maxCP');
        t.nonNull.list.nonNull.field('evolutions', { type: Pokemon });
        t.field('evolutionRequirements', { type: PokemonEvolutionRequirement });
        t.nonNull.int('maxHP');
        t.nonNull.boolean('isFavorite');
    },
});
export const PokemonAttack = objectType({
    name: 'PokemonAttack',
    definition(t) {
        t.nonNull.list.nonNull.field('fast', { type: Attack });
        t.nonNull.list.nonNull.field('special', { type: Attack });
    },
});
export const PokemonDimension = objectType({
    name: 'PokemonDimension',
    definition(t) {
        t.nonNull.string('minimum');
        t.nonNull.string('maximum');
    },
});
export const PokemonEvolutionRequirement = objectType({
    name: 'PokemonEvolutionRequirement',
    definition(t) {
        t.nonNull.int('amount');
        t.nonNull.string('name');
    },
});
