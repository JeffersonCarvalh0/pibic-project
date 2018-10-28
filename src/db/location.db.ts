import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

import { IContent } from './content.db';

export interface ILocation extends Document {
    name: string;
    description: string;
    coord: { type: string, coordinates: number[] };
}

export interface ILocationUser {
    _id: string;
    name: string;
    description: string;
    coord: number[];
    [key: string]: any;
}

export var LocationSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    coord: {
        type: { type: String },
        coordinates: [Number], // [longitude, latitude]
    },
});
LocationSchema.index({ "coord": "2dsphere" });

export const LocationModel: Model<ILocation> = model<ILocation>("Location", LocationSchema);
