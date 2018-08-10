import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

import { ILocation } from './location.db';

export interface IActivity extends Document {
    title: string;
    statement: string;
    locations: [ ILocation ];
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

    locations: [ { type: Schema.Types.ObjectId, ref: 'Location' } ]
});

export const ActivityModel: Model<IActivity> = model<IActivity>("Activity", ActivitySchema);
