import Fastify from 'fastify';
import mongoose from 'mongoose';

import { createApiRoute } from './api';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const MONGODB = process.env.MONGODB ?? 'mongodb://root:testPassword@127.0.0.1:27017';

export async function createFastifyServer() {
    console.log('Starting...');
    const fastify = Fastify();

    console.log(`Connecting to MongoDB ${MONGODB}...`);
    await mongoose.connect(MONGODB);
    fastify.addHook('onClose', async () => {
        await mongoose.connection.close();
    });

    await createApiRoute(fastify);
    await fastify.listen({ port: PORT });
    console.log(`Server successfully started at port ${PORT}`);
    return fastify;
}
