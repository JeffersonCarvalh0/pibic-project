import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';
import { app } from '../app';

/** The cat's interface to be used within TS code */
export interface ICat {
    name: string;
    color: string;
    age: number;
}

/** The schema from which mongoose will create a collection */
export var CatSchema = new Schema({
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
    }
});

/** The model that represents documents */
export interface ICatModel extends ICat, Document {
    // I can put methods related to cats here
}

export const CatModel: Model<ICatModel> = mongoose.model<ICatModel>("Cat", CatSchema);
