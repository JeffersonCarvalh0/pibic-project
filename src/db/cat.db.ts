import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface ICat extends Document {
    name: string;
    color: string;
    age: number;
    createdBy: string
}

export var CatSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    name: {
        required: true,
        type: String
    },

    color: {
        required: true,
        type: String
    },

    age: {
        required: true,
        type: Number
    },

    createdBy: {
        required: true,
        type: String
    }
});

export const CatModel: Model<ICat> = model<ICat>("Cat", CatSchema);
