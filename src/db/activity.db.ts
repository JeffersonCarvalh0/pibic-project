import { Document, Model, model, Schema } from 'mongoose'

import { IContent } from './content.db'
import { ILocation } from './location.db'

export interface IActivity extends Document {
  title: string
  description: string
  location: ILocation
  content: IContent
}

export let ActivitySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },

  content: {
    type: Schema.Types.ObjectId,
    ref: 'Content',
  },
})

export const ActivityModel: Model<IActivity> = model<IActivity>('Activity', ActivitySchema)
