import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface IContent extends Document {
    description: string;
    correct: string;
    wrong: string
}

export var ContentSchema: Schema = new Schema({
    description: {
        type: String,
        required: true
    },

    correct: {
        type: String,
        required: true
    },

    wrong: {
        type: String,
        required: true
    }
});

export const ContentModel: Model<IContent> = model<IContent>("Content", ContentSchema);
