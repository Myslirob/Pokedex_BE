import path from 'path';

import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { makeSchema } from 'nexus';
import { ApolloServer } from '@apollo/server';

import * as types from './schema';

import type { FastifyInstance } from 'fastify';
import type { BaseContext } from '@apollo/server';

export const createGraphqlRoute = async (fastify: FastifyInstance) => {
    const schema = makeSchema({
        types,
        outputs: {
            schema: path.join(__dirname, '__generated__/schema.graphql'),
            typegen: path.join(__dirname, '__generated__/typegen.ts'),
        },
    });

    const apollo = new ApolloServer<BaseContext>({
        schema,
        plugins: [
            fastifyApolloDrainPlugin(fastify),
        ],
    });

    console.log('Starting Apollo server...');
    await apollo.start();

    console.log('Register graphql route...');
    fastify.route({
        url: '/graphql',
        method: ['POST', 'OPTIONS', 'GET'],
        handler: fastifyApolloHandler(apollo),
    });
};
