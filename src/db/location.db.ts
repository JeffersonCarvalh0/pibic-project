import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface ILocation extends Document {
    name: string,
    coord: { type: string, coordinates: number[] }
}

export interface ILocationUser {
    id: string,
    name: string,
    latitude: number,
    longitude: number
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

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
});
LocationSchema.index({ "coord": "2dsphere" });

export const LocationModel: Model<ILocation> = model<ILocation>("Location", LocationSchema);
