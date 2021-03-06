import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import config from '../config'
import { IUser, UserModel } from '../db/user.db'

/** Functions to process the authentication requests */
export class UserController {
  public static login(req: Request, res: Response) {
    passport.authenticate('local', { session: false }, (err: Error, user: IUser, info) => {
      res.statusCode = err || !user ? 401 : 200
      const token = user ? jwt.sign(user.toJSON(), config.SECRET, { expiresIn: '15m' }) : null
      res.json({ data: { token }, message: info.message, errors: err })
    })(req, res)
  }

  public static async register(req: Request, res: Response) {
    try {
      const user: IUser = new UserModel(req.body)

      user.save((err: Error, doc: IUser) => {
        res.statusCode = err ? 400 : 201
        if (doc) {
          doc.password = ''
        }
        const message = err ? err.message : 'user created'
        res.json({ data: doc, message, errors: err })
      })
    } catch (err) {
      throw err
    }
  }

  public static getUser(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, (err: Error, user: IUser, info) => {
      res.statusCode = user ? 200 : 401
      if (user) {
        user.password = ''
      }
      res.json({ data: user, message: info.message, errors: [] })
    })(req, res)
  }

  public static async remove(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, async (err: Error, user: IUser, info) => {
      res.statusCode = user ? 204 : 401
      if (user) {
        await UserModel.findByIdAndRemove(user._id)
      }
      if (res.statusCode === 204) {
        res.json()
      } else {
        res.json({ data: null, message: info.message, errors: err })
      }
    })(req, res)
  }
}
