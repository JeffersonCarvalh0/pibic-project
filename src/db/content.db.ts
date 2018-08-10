import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface IContent extends Document {
    title: string;
    description: string;
}

export var ContentSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    }
});

export const ContentModel: Model<IContent> = model<IContent>("Content", ContentSchema);
