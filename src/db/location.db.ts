import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface ILocation extends Document {
    latitude: number;
    longitude: number;
}

export var LocationSchema: Schema = new Schema({
    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    }
});

export const LocationModel: Model<ILocation> = model<ILocation>("Location", LocationSchema);
