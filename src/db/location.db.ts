import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

import { IContent } from './content.db';

export interface ILocation extends Document {
    name: string;
    coord: { type: string, coordinates: number[] };
    content: IContent;
}

export interface ILocationUser {
    _id: string;
    name: string;
    content: IContent | null;
    latitude: number;
    longitude: number;
}

export var LocationSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    coord: {
        type: { type: String },
        coordinates: [Number], // [longitude, latitude]
    },

    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content',
        default: null
    },
});
LocationSchema.index({ "coord": "2dsphere" });

export const LocationModel: Model<ILocation> = model<ILocation>("Location", LocationSchema);
