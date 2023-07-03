# Pokedex

This is a Pokemon database that allows you to filter and search for Pokemon based on their category and name. You can also mark Pokemon as favorites and filter the list to show only your favorite ones.

## Features

The Pokedex project provides the following features:

1. **Pokemon Database**: Browse through a comprehensive collection of Pokemon.
2. **Filtering**: Filter Pokemon by category or name to quickly find the ones you're interested in.
3. **Favorites**: Mark Pokemon as favorites to create a personalized list.
4. **Favorite Filtering**: View and filter the list to display only your favorite Pokemon.

## Getting Started

To get started with the Pokedex project, follow these steps:

1. Clone the repository: `git clone https://github.com/myslirob/Pokedex_BE.git`
2. Navigate to the project directory: `cd Pokedex_BE`
3. Install the necessary dependencies: `yarn install`
4. Start the MongoDB: `yarn run docker:mongodb`
5. Generate testing data: `yarn run generateData`
6. Start the application: `yarn run dev`

## Usage

After running the backend, you can access https://localhost:8080/api/graphql in the browser, you'll be presented with a GraphQL Playground that allows you to run Queries and Mutations as well as view the GraphQL Schema.

These are examples of queries and mutation
```graphql
query PokemonById {
  pokemonById(id: "001") {
    id
    isFavorite
    name
    types
    weaknesses
    resistant
    maxCP
    maxHP
    evolutions {
      name
      id
    }
  }
}
```
```graphql
query Pokemons {
    pokemons(query: { limit: 20, offset: 0, filter: { type: "Grass" } } ) {
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
}
```
```graphql
mutation FavoritePokemon {
  favoritePokemon(id: "001") {
    id
    name
    isFavorite
  }
}
```
## Available Scripts

- **dev**: Starts the development server using the command `next dev`. This script is intended for development purposes and allows you to quickly see changes in the application during development.
- **build**: Generates an optimized production build of the application using the command `next build`. This script is used before deploying the application to a production environment.
- **docker:mongodb**: Runs a MongoDB Docker container on port 27017 using Docker Compose.
- **generateData**: Runs the generateData script using ts-node. This script is responsible for generating data.
- **check**: This script runs the check:cs, check:types, and check:tests scripts sequentially to perform various checks.

## Technologies Used

The Pokedex project utilizes the following technologies:

- **Nexus**: Nexus is a code-first GraphQL schema construction library for JavaScript/TypeScript. It provides a declarative API for defining GraphQL schemas and resolvers.

- **Fastify**: Fastify is a fast and low-overhead web framework for Node.js. It is focused on providing excellent performance while maintaining a developer-friendly API.

- **Apollo Server**: Apollo Server is a community-driven, open-source GraphQL server that works with any GraphQL schema. It is built on top of popular web frameworks like Express, Fastify, and more.

- **Mongoose**: Mongoose is an elegant MongoDB object modeling tool for Node.js. It provides a straightforward way to define schemas, perform database operations, and interact with MongoDB.

- **MongoDB**: MongoDB is a popular NoSQL database that provides high-performance, high-availability, and easy scalability. It stores data in flexible, JSON-like documents.

- **Jest**: Jest is a JavaScript testing framework that is widely used for testing applications, including GraphQL APIs. It provides a simple and intuitive API for writing tests and comes with powerful features like test runners, assertions, and mocks.

- **GraphQL**: GraphQL is a query language and runtime for APIs. It allows clients to specify the structure of the data they need and enables efficient data fetching from multiple sources using a single request.
