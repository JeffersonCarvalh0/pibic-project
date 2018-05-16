import mongoose from 'mongoose';
import { Schema, Document, Model, model } from 'mongoose';

export interface IUser {
    createdAt: Date;
    username: string;
    password: string;
    name: {
        firstName: string,
        lastName: string
    }
    email: string;
}

export var UserSchema = new Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
});

export interface IUserModel extends Document, IUser {
    // User related methods here
}

export const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);
