import mongoose from 'mongoose';

import { generateTestingData } from '../test/generateTestingData';

const MONGODB = process.env.MONGODB ?? 'mongodb://root:testPassword@127.0.0.1:27017';

async function generateData() {
    await mongoose.connect(MONGODB);
    await generateTestingData();
    process.exit(0);
}
generateData();
