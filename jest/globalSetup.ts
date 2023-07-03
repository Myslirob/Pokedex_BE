import '../test/setEnvVars';
import mongoose from 'mongoose';

import { generateTestingData } from '../test/generateTestingData';

export default async function setup() {
    await mongoose.connect('mongodb://root:testPassword@127.0.0.1:27017');
    await generateTestingData();
    await mongoose.disconnect();
}
