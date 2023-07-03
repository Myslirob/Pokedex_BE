import mongoose, { Schema } from 'mongoose';

export const pokemonSchema = new Schema({
    _id: String,
    name: { type: String, required: true },
    classification: { type: String, required: true },
    types: [{ type: String, ref: 'Type', required: true }],
    resistant: [{ type: String, ref: 'Type', required: true }],
    weaknesses: [{ type: String, ref: 'Type', required: true }],
    weight: {
        type: {
            minimum: { type: String, required: true },
            maximum: { type: String, required: true },
        },
        required: true,
    },
    height: {
        type: {
            minimum: { type: String, required: true },
            maximum: { type: String, required: true },
        },
        required: true,
    },
    fleeRate: { type: Number, required: true },
    evolutionRequirements: {
        type: new Schema({
            amount: { type: Number, required: true },
            name: { type: String, required: true },
        }),
        required: false,
    },
    evolutions: [{ type: String, ref: 'Pokemon' }],
    maxCP: { type: Number, required: true },
    maxHP: { type: Number, required: true },
    attacks: {
        type: {
            fast: [{ type: String, ref: 'Attack', required: true }],
            special: [{ type: String, ref: 'Attack', required: true }],
        },
        required: true,
    },
    isFavorite: { type: Boolean, default: false },
}, { _id: false });

export const Pokemon = mongoose.model('Pokemon', pokemonSchema);
