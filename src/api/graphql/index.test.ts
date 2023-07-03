import supertest from 'supertest';

import { createFastifyServer } from '../../server';
import { getNextPokemonId, toResponseObject } from '../../../test/testUtils';
import { Pokemon } from '../../model/pokemon';
import { assertNotNull } from '../../helper/assert';

import type { FastifyInstance } from 'fastify';

describe('Graphql', () => {
    let fastifyServer: Promise<FastifyInstance>;

    beforeAll(async () => {
        fastifyServer = createFastifyServer();
    });

    afterAll(async () => {
        (await fastifyServer).close();
    });

    describe('Mutation', () => {
        it('Should mark pokemon as favorite', async () => {
            const pokemon = await Pokemon.findById(getNextPokemonId());
            assertNotNull(pokemon);
            expect(pokemon.isFavorite).toBe(false);
            const mutationData = {
                query: `mutation FavoritePokemon($id: ID!) {
                  favoritePokemon(id: $id) {
                    id
                    name
                    isFavorite
                  }
                }`,
                variables: { id: pokemon.id },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(mutationData);
            const responseData = toResponseObject(response);
            expect(responseData.body.data.favoritePokemon.id).toBe(pokemon.id);
            expect(responseData.body.data.favoritePokemon.name).toBe(pokemon.name);
            expect(responseData.body.data.favoritePokemon.isFavorite).toBe(true);
            const freshPokemon = await Pokemon.findById(pokemon.id).exec();
            assertNotNull(freshPokemon);
            expect(freshPokemon.isFavorite).toBe(true);
        });

        it('Should unmark pokemon as favorite', async () => {
            const pokemon = await Pokemon.findById(getNextPokemonId());
            assertNotNull(pokemon);
            pokemon.isFavorite = true;
            await pokemon.save();
            expect(pokemon.isFavorite).toBe(true);
            const mutationData = {
                query: `mutation UnfavoritePokemon($id: ID!) {
                  unFavoritePokemon(id: $id) {
                    id
                    name
                    isFavorite
                  }
                }`,
                variables: { id: pokemon.id },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(mutationData);
            const responseData = toResponseObject(response);
            expect(responseData.body.data.unFavoritePokemon.id).toBe(pokemon.id);
            expect(responseData.body.data.unFavoritePokemon.name).toBe(pokemon.name);
            expect(responseData.body.data.unFavoritePokemon.isFavorite).toBe(false);
            const freshPokemon = await Pokemon.findById(pokemon.id).exec();
            assertNotNull(freshPokemon);
            expect(freshPokemon.isFavorite).toBe(false);
        });
    });

    describe('Queries', () => {
        it('Should return pokemon by id', async () => {
            const pokemon = await Pokemon.findById('001');
            assertNotNull(pokemon);

            const queryData = {
                query: `query PokemonById($pokemonByIdId: ID!) {
                  pokemonById(id: $pokemonByIdId) {
                    id
                    isFavorite
                    name
                    types
                    weaknesses
                    resistant
                    maxCP
                    maxHP
                    attacks {
                      fast {
                        name
                        damage
                      }
                    }
                    evolutions {
                      name
                      id
                    }
                  }
                }`,
                variables: { pokemonByIdId: pokemon.id },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(queryData);
            const responseData = toResponseObject(response);
            expect(responseData.body.data.pokemonById.id).toBe(pokemon.id);
            expect(responseData.body.data.pokemonById.name).toBe(pokemon.name);
            expect(responseData).toMatchSnapshot({
                body: {
                    data: {
                        pokemonById: {
                            id: expect.any(String),
                            name: expect.any(String),
                            maxCP: expect.any(Number),
                            maxHP: expect.any(Number),
                            isFavorite: expect.any(Boolean),
                        },
                    },
                },
            });
        });

        it('Should return correct error when pokemon doesn\'t exist', async () => {
            const queryData = {
                query: `query PokemonById($pokemonByIdId: ID!) {
                  pokemonById(id: $pokemonByIdId) {
                    id
                    isFavorite
                    name
                    types
                    weaknesses
                    resistant
                    maxCP
                    maxHP
                  }
                }`,
                variables: { pokemonByIdId: 'xxx' },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(queryData);
            const responseData = toResponseObject(response);
            expect(responseData).toMatchSnapshot();
        });

        it('Should return pokemon by name', async () => {
            const pokemon = await Pokemon.findById(getNextPokemonId());
            assertNotNull(pokemon);

            const queryData = {
                query: `query PokemonByName($name: String!) {
                   pokemonByName(name: $name) {
                    id
                    isFavorite
                    name
                    types
                    weaknesses
                    resistant
                    maxCP
                    maxHP
                  }
                }`,
                variables: { name: pokemon.name },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(queryData);
            const responseData = toResponseObject(response);
            expect(responseData.body.data.pokemonByName.id).toBe(pokemon.id);
            expect(responseData.body.data.pokemonByName.name).toBe(pokemon.name);
            expect(responseData).toMatchSnapshot({
                body: {
                    data: {
                        pokemonByName: {
                            id: expect.any(String),
                            name: expect.any(String),
                            maxCP: expect.any(Number),
                            maxHP: expect.any(Number),
                            isFavorite: expect.any(Boolean),
                        },
                    },
                },
            });
        });

        describe('Should return pokemons by filter', () => {
            it('isFavorite', async () => {
                const pokemon = await Pokemon.findById(getNextPokemonId());
                assertNotNull(pokemon);
                pokemon.isFavorite = true;
                await pokemon.save();

                const queryData = {
                    query: `query Pokemons($query: PokemonsQueryInput!) {
                      pokemons(query: $query) {
                        count
                        edges {
                          classification
                          name
                          types
                          weaknesses
                          resistant
                          maxHP
                          maxCP
                          id
                          isFavorite
                        }
                        limit
                        offset
                      }
                    }`,
                    variables: { query: { limit: 20, offset: 0, filter: { isFavorite: true } } },
                };
                const response = await supertest((await fastifyServer).server)
                    .post('/api/graphql')
                    .set('Content-Type', 'application/json')
                    .send(queryData);
                const responseData = toResponseObject(response);
                expect(responseData.body.data.pokemons.edges.length).toBe(responseData.body.data.pokemons.count);
                expect(responseData.body.data.pokemons.edges.length).not.toBe(0);
                for (const pokemon of responseData.body.data.pokemons.edges) {
                    expect(pokemon.isFavorite).toBe(true);
                }
            });

            it('type', async () => {
                const queryData = {
                    query: `query Pokemons($query: PokemonsQueryInput!) {
                      pokemons(query: $query) {
                        count
                        edges {
                          classification
                          name
                          types
                          weaknesses
                          resistant
                          maxHP
                          maxCP
                          id
                          isFavorite
                        }
                        limit
                        offset
                      }
                    }`,
                    variables: { query: { limit: 20, offset: 0, filter: { type: 'Grass' } } },
                };
                const response = await supertest((await fastifyServer).server)
                    .post('/api/graphql')
                    .set('Content-Type', 'application/json')
                    .send(queryData);
                const responseData = toResponseObject(response);
                expect(responseData.body.data.pokemons.edges.length).toBe(14);
                for (const pokemon of responseData.body.data.pokemons.edges) {
                    expect(pokemon.types.includes('Grass')).toBe(true);
                }
            });

            it('type & limit & offset', async () => {
                const queryData = {
                    query: `query Pokemons($query: PokemonsQueryInput!) {
                      pokemons(query: $query) {
                        count
                        edges {
                          classification
                          name
                          types
                          weaknesses
                          resistant
                          maxHP
                          maxCP
                          id
                          isFavorite
                        }
                        limit
                        offset
                      }
                    }`,
                    variables: { query: { limit: 20, offset: 0, filter: { type: 'Poison' } } },
                };
                const response = await supertest((await fastifyServer).server)
                    .post('/api/graphql')
                    .set('Content-Type', 'application/json')
                    .send(queryData);
                const responseData = toResponseObject(response);
                expect(responseData.body.data.pokemons.edges.length).toBe(20);
                for (const pokemon of responseData.body.data.pokemons.edges) {
                    expect(pokemon.types.includes('Poison')).toBe(true);
                }

                const response2 = await supertest((await fastifyServer).server)
                    .post('/api/graphql')
                    .set('Content-Type', 'application/json')
                    .send({ ...queryData, variables: { query: { limit: 20, offset: 19, filter: { type: 'Poison' } } } });
                const responseData2 = toResponseObject(response2);
                expect(responseData.body.data.pokemons.edges[19].id).toBe(responseData2.body.data.pokemons.edges[0].id);
                expect(responseData2.body.data.pokemons.edges.length).toBe(14);
                for (const pokemon of responseData2.body.data.pokemons.edges) {
                    expect(pokemon.types.includes('Poison')).toBe(true);
                }
            });

            it('type & isFavorite', async () => {
                const pokemon = await Pokemon.findById(getNextPokemonId());
                assertNotNull(pokemon);
                pokemon.isFavorite = true;
                await pokemon.save();

                const queryData = {
                    query: `query Pokemons($query: PokemonsQueryInput!) {
                      pokemons(query: $query) {
                        count
                        edges {
                          classification
                          name
                          types
                          weaknesses
                          resistant
                          maxHP
                          maxCP
                          id
                          isFavorite
                        }
                        limit
                        offset
                      }
                    }`,
                    variables: { query: { limit: 20, offset: 0, filter: { type: pokemon.types[0], isFavorite: true } } },
                };
                const response = await supertest((await fastifyServer).server)
                    .post('/api/graphql')
                    .set('Content-Type', 'application/json')
                    .send(queryData);
                const responseData = toResponseObject(response);
                expect(responseData.body.data.pokemons.edges.length).not.toBe(0);
                for (const _pokemon of responseData.body.data.pokemons.edges) {
                    expect(_pokemon.types.includes(pokemon.types[0])).toBe(true);
                    expect(_pokemon.isFavorite).toBe(true);
                }
            });

            it('search & isFavorite & type', async () => {
                const pokemon = await Pokemon.findById(getNextPokemonId());
                assertNotNull(pokemon);
                pokemon.isFavorite = true;
                await pokemon.save();

                const searchValue = pokemon.name.slice(0, 4).toLowerCase();

                const queryData = {
                    query: `query Pokemons($query: PokemonsQueryInput!) {
                      pokemons(query: $query) {
                        count
                        edges {
                          classification
                          name
                          types
                          weaknesses
                          resistant
                          maxHP
                          maxCP
                          id
                          isFavorite
                        }
                        limit
                        offset
                      }
                    }`,
                    variables: { query: { limit: 20, offset: 0, filter: { type: pokemon.types[0], isFavorite: true }, search: searchValue } },
                };
                const response = await supertest((await fastifyServer).server)
                    .post('/api/graphql')
                    .set('Content-Type', 'application/json')
                    .send(queryData);
                const responseData = toResponseObject(response);
                expect(responseData.body.data.pokemons.edges.length).not.toBe(0);
                for (const _pokemon of responseData.body.data.pokemons.edges) {
                    expect(_pokemon.types.includes(pokemon.types[0])).toBe(true);
                    expect(_pokemon.isFavorite).toBe(true);
                    expect(_pokemon.name.toLowerCase().includes(searchValue)).toBe(true);
                }
            });
        });

        it.each([
            'PI',
            'KACH',
            'pika',
            'pikachu',
        ])('Should return Pikachu by search %p', async (searchValue) => {
            const queryData = {
                query: `query Pokemons($query: PokemonsQueryInput!) {
                  pokemons(query: $query) {
                    count
                    edges {
                      classification
                      name
                      types
                      weaknesses
                      resistant
                      maxHP
                      maxCP
                      id
                      isFavorite
                    }
                    limit
                    offset
                  }
                }`,
                variables: { query: { limit: 20, offset: 0, search: searchValue } },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(queryData);
            const responseData = toResponseObject(response);
            expect(responseData.body.data.pokemons.edges.find((pokemon) => pokemon.id === '025')).not.toBe(undefined);
        });

        it('Should return empty array on search', async () => {
            const queryData = {
                query: `query Pokemons($query: PokemonsQueryInput!) {
                  pokemons(query: $query) {
                    count
                    edges {
                      classification
                      name
                      types
                      weaknesses
                      resistant
                      maxHP
                      maxCP
                      id
                      isFavorite
                    }
                    limit
                    offset
                  }
                }`,
                variables: { query: { limit: 20, offset: 0, search: 'searchValue' } },
            };
            const response = await supertest((await fastifyServer).server)
                .post('/api/graphql')
                .set('Content-Type', 'application/json')
                .send(queryData);
            const responseData = toResponseObject(response);
            expect(responseData.body.data.pokemons.edges.length).toBe(0);
        });
    });

    it('Should return pokemon types', async () => {
        const queryData = {
            query: `query Query {
                  pokemonTypes
                }`,
        };
        const response = await supertest((await fastifyServer).server)
            .post('/api/graphql')
            .set('Content-Type', 'application/json')
            .send(queryData);
        const responseData = toResponseObject(response);
        expect(responseData).toMatchSnapshot();
    });
});
