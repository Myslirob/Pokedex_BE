import { Type } from '../src/model/type';
import { Pokemon } from '../src/model/pokemon';
import { Attack } from '../src/model/attack';

import type { Document } from 'mongoose';

export async function generateTestingData() {
    const pokemonJson = require('./asset/pokemons.json');
    console.log('Erasing MongoDB...');
    await Promise.all([
        Type.deleteMany(),
        Pokemon.deleteMany(),
        Attack.deleteMany(),
    ]);
    console.log('Creating testing data...');
    const types = new Set<string>();
    const attacks: Document[] = [];
    const pokemons: Document[] = [];
    for (const pokemon of pokemonJson) {
        for (const type of pokemon.types) types.add(type);
        for (const attack of [ ...pokemon.attacks.fast, ...pokemon.attacks.special ]) {
            if (attacks.some((a) => a._id === attack.name)) continue;
            attacks.push(new Attack({
                _id: attack.name,
                name: attack.name,
                type: attack.type,
                damage: attack.damage,
            }));
        }
        pokemons.push(new Pokemon({
            _id: pokemon.id,
            types: pokemon.types,
            name: pokemon.name,
            classification: pokemon.classification,
            resistant: pokemon.resistant,
            weaknesses: pokemon.weaknesses,
            weight: pokemon.weight,
            height: pokemon.height,
            fleeRate: pokemon.fleeRate,
            evolutionRequirements: pokemon.evolutionRequirements,
            evolutions: (pokemon.evolutions ?? []).map((evolution) => `${evolution.id}`.padStart(3, '0')),
            maxCP: pokemon.maxCP,
            maxHP: pokemon.maxHP,
            attacks: {
                fast: pokemon.attacks.fast.map((attack) => attack.name),
                special: pokemon.attacks.special.map((attack) => attack.name),
            },
            isFavorite: false,
        }));
    }
    await Promise.all([...types.values()].map((type) => (new Type({ _id: type, name: type })).save()));
    await Promise.all(attacks.map((attack) => attack.save()));
    await Promise.all(pokemons.map((pokemon) => pokemon.save()));
    console.log(`Saved ${types.size} types of pokemon`);
    console.log(`Saved ${attacks.length} attacks`);
    console.log(`Saved ${pokemons.length} pokemons`);
    console.log('Generating testing data is done');
}
