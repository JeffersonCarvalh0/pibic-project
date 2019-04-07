import mongoose, { Document, Model, model, Schema } from 'mongoose'

export interface IContent extends Document {
  description: string
  correct: string
  wrong: string
}

export let ContentSchema: Schema = new Schema({
  description: {
    type: String,
    required: true,
  },

  correct: {
    type: String,
    required: true,
  },

  wrong: {
    type: String,
    required: true,
  },
})

export const ContentModel: Model<IContent> = model<IContent>('Content', ContentSchema)
