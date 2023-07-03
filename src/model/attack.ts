import mongoose, { Schema } from 'mongoose';

export const attackSchema = new Schema({
    _id: String,
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    damage: { type: Number, required: true },
});

export const Attack = mongoose.model('Attack', attackSchema);

export interface AttackType {
    name: string;
    damage: number;
    type: string;
}
