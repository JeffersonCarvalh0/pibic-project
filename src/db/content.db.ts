import { Document, Model, model, Schema } from 'mongoose'

export interface IContent extends Document {
  title: string
  description: string
}

export const ContentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const ContentModel: Model<IContent> = model<IContent>('Content', ContentSchema)
