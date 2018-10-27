import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

import { ILocation } from './location.db';
import { IContent } from './content.db';

export interface IActivity extends Document {
    title: string;
    statement: string;
    location: ILocation;
    content: IContent
}

export var ActivitySchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },

    statement: {
        type: String,
        required: true
    },

    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },

    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content'
    }
});

export const ActivityModel: Model<IActivity> = model<IActivity>("Activity", ActivitySchema);
