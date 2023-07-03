import mongoose, { Schema } from 'mongoose';

const typeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    _id: String,
});

export const Type = mongoose.model('Type', typeSchema);
