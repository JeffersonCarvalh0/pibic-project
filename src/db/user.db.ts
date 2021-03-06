import bcrypt from 'bcrypt'
import mongoose, { Document, Model, model, Schema } from 'mongoose'

import config from '../config'

export interface IUser extends Document {
  createdAt: Date
  username: string
  password: string
  name: {
    firstName: string
    lastName: string
  }
  email: string

  compare: (psw: string, cb: (err: Error, isMatch: boolean) => void) => boolean
}

export let UserSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  name: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
})

UserSchema.index({ username: 1 })
UserSchema.index({ email: 1 })

UserSchema.pre('save', function(this: IUser, next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  bcrypt
    .hash(user.password, config.SALT_ROUNDS)
    .then(hash => {
      user.password = hash
      next()
    })
    .catch(err => {
      throw err
    })
})

UserSchema.methods.compare = function(psw: string, cb: (err: Error | null, isMatch?: boolean) => void) {
  bcrypt
    .compare(psw, this.password)
    .then(res => cb(null, res))
    .catch(err => cb(err))
}

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema)
