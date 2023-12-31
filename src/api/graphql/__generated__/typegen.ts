/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PokemonFilterInput: { // input type
    isFavorite?: boolean | null; // Boolean
    type?: string | null; // String
  }
  PokemonsQueryInput: { // input type
    filter?: NexusGenInputs['PokemonFilterInput'] | null; // PokemonFilterInput
    limit: number; // Int!
    offset: number; // Int!
    search?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Attack: { // root type
    damage: number; // Int!
    name: string; // String!
    type: string; // String!
  }
  Mutation: {};
  Pokemon: { // root type
    attacks: NexusGenRootTypes['PokemonAttack']; // PokemonAttack!
    classification: string; // String!
    evolutionRequirements?: NexusGenRootTypes['PokemonEvolutionRequirement'] | null; // PokemonEvolutionRequirement
    evolutions: NexusGenRootTypes['Pokemon'][]; // [Pokemon!]!
    fleeRate: number; // Float!
    height: NexusGenRootTypes['PokemonDimension']; // PokemonDimension!
    id: string; // ID!
    isFavorite: boolean; // Boolean!
    maxCP: number; // Int!
    maxHP: number; // Int!
    name: string; // String!
    resistant: string[]; // [String!]!
    types: string[]; // [String!]!
    weaknesses: string[]; // [String!]!
    weight: NexusGenRootTypes['PokemonDimension']; // PokemonDimension!
  }
  PokemonAttack: { // root type
    fast: NexusGenRootTypes['Attack'][]; // [Attack!]!
    special: NexusGenRootTypes['Attack'][]; // [Attack!]!
  }
  PokemonConnection: { // root type
    count: number; // Int!
    edges: NexusGenRootTypes['Pokemon'][]; // [Pokemon!]!
    limit: number; // Int!
    offset: number; // Int!
  }
  PokemonDimension: { // root type
    maximum: string; // String!
    minimum: string; // String!
  }
  PokemonEvolutionRequirement: { // root type
    amount: number; // Int!
    name: string; // String!
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Attack: { // field return type
    damage: number; // Int!
    name: string; // String!
    type: string; // String!
  }
  Mutation: { // field return type
    favoritePokemon: NexusGenRootTypes['Pokemon'] | null; // Pokemon
    unFavoritePokemon: NexusGenRootTypes['Pokemon'] | null; // Pokemon
  }
  Pokemon: { // field return type
    attacks: NexusGenRootTypes['PokemonAttack']; // PokemonAttack!
    classification: string; // String!
    evolutionRequirements: NexusGenRootTypes['PokemonEvolutionRequirement'] | null; // PokemonEvolutionRequirement
    evolutions: NexusGenRootTypes['Pokemon'][]; // [Pokemon!]!
    fleeRate: number; // Float!
    height: NexusGenRootTypes['PokemonDimension']; // PokemonDimension!
    id: string; // ID!
    isFavorite: boolean; // Boolean!
    maxCP: number; // Int!
    maxHP: number; // Int!
    name: string; // String!
    resistant: string[]; // [String!]!
    types: string[]; // [String!]!
    weaknesses: string[]; // [String!]!
    weight: NexusGenRootTypes['PokemonDimension']; // PokemonDimension!
  }
  PokemonAttack: { // field return type
    fast: NexusGenRootTypes['Attack'][]; // [Attack!]!
    special: NexusGenRootTypes['Attack'][]; // [Attack!]!
  }
  PokemonConnection: { // field return type
    count: number; // Int!
    edges: NexusGenRootTypes['Pokemon'][]; // [Pokemon!]!
    limit: number; // Int!
    offset: number; // Int!
  }
  PokemonDimension: { // field return type
    maximum: string; // String!
    minimum: string; // String!
  }
  PokemonEvolutionRequirement: { // field return type
    amount: number; // Int!
    name: string; // String!
  }
  Query: { // field return type
    pokemonById: NexusGenRootTypes['Pokemon'] | null; // Pokemon
    pokemonByName: NexusGenRootTypes['Pokemon'] | null; // Pokemon
    pokemonTypes: string[]; // [String!]!
    pokemons: NexusGenRootTypes['PokemonConnection']; // PokemonConnection!
  }
}

export interface NexusGenFieldTypeNames {
  Attack: { // field return type name
    damage: 'Int'
    name: 'String'
    type: 'String'
  }
  Mutation: { // field return type name
    favoritePokemon: 'Pokemon'
    unFavoritePokemon: 'Pokemon'
  }
  Pokemon: { // field return type name
    attacks: 'PokemonAttack'
    classification: 'String'
    evolutionRequirements: 'PokemonEvolutionRequirement'
    evolutions: 'Pokemon'
    fleeRate: 'Float'
    height: 'PokemonDimension'
    id: 'ID'
    isFavorite: 'Boolean'
    maxCP: 'Int'
    maxHP: 'Int'
    name: 'String'
    resistant: 'String'
    types: 'String'
    weaknesses: 'String'
    weight: 'PokemonDimension'
  }
  PokemonAttack: { // field return type name
    fast: 'Attack'
    special: 'Attack'
  }
  PokemonConnection: { // field return type name
    count: 'Int'
    edges: 'Pokemon'
    limit: 'Int'
    offset: 'Int'
  }
  PokemonDimension: { // field return type name
    maximum: 'String'
    minimum: 'String'
  }
  PokemonEvolutionRequirement: { // field return type name
    amount: 'Int'
    name: 'String'
  }
  Query: { // field return type name
    pokemonById: 'Pokemon'
    pokemonByName: 'Pokemon'
    pokemonTypes: 'String'
    pokemons: 'PokemonConnection'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    favoritePokemon: { // args
      id: string; // ID!
    }
    unFavoritePokemon: { // args
      id: string; // ID!
    }
  }
  Query: {
    pokemonById: { // args
      id: string; // ID!
    }
    pokemonByName: { // args
      name: string; // String!
    }
    pokemons: { // args
      query: NexusGenInputs['PokemonsQueryInput']; // PokemonsQueryInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}