import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface IContent extends Document {
    description: string;
    correct: string;
    wrong: string
}

export var ContentSchema: Schema = new Schema({
    description: {
        type: String
    },

    correct: {
        type: String
    },

    wrong: {
        type: String
    }
});

export const ContentModel: Model<IContent> = model<IContent>("Content", ContentSchema);
