import mongoose, { Document, Model, model, Schema } from 'mongoose'

import { IContent } from './content.db'

export interface ILocation extends Document {
  name: string
  description: string
  coord: { type: string; coordinates: number[] }
}

export interface ILocationUser {
  _id: string
  name: string
  description: string
  coord: number[]
  [key: string]: any
}

export let LocationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  coord: {
    type: { type: String },
    coordinates: [Number], // [longitude, latitude]
  },
})
LocationSchema.index({ coord: '2dsphere' })

export const LocationModel: Model<ILocation> = model<ILocation>('Location', LocationSchema)
