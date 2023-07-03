import { createGraphqlRoute } from './graphql';

import type { FastifyInstance } from 'fastify';

export const createApiRoute = async (fastify: FastifyInstance) => {
    fastify.register(createGraphqlRoute, { prefix: '/api' });
};
