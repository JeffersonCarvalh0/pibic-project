import { Request, Response } from 'express'
import passport from 'passport'

import { ContentModel, IContent } from '../db/content.db'
import { IUser } from '../db/user.db'

export class ContentController {
  public static getAll(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, async (err: Error, user: IUser) => {
      let data: IContent[] | null = null
      let errors: object[] = err ? [err] : []

      res.statusCode = err || !user ? 401 : 200

      try {
        data = await ContentModel.find({ createdBy: user._id })
      } catch (err) {
        errors.push(err)
      }

      res.json({ data, errors })
    })(req, res)
  }

  public static getById(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, async (err: Error, user: IUser) => {
      const contentId = req.params.id
      let data: IContent | null = null
      let errors: object[] = err ? [err] : []

      res.statusCode = err || !user ? 401 : 200

      try {
        data = await ContentModel.findOne({ createdBy: user._id, _id: contentId })
        if (!data) {
          res.statusCode = 404
        }
      } catch (err) {
        errors.push(err)
      }

      res.json({ data, errors })
    })(req, res)
  }

  public static create(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, (authErr: Error, user: IUser) => {
      const content = new ContentModel({ ...req.body, createdBy: user._id })
      let errors: object[] = authErr ? [authErr] : []

      content.save((err: Error, doc: IContent) => {
        if (err) {
          errors.push(err)
        }
        res.statusCode = err ? 406 : 201
        if (!err) {
          res.location(`/content/${doc._id}`)
        }
        res.json({ data: doc, errors })
      })
    })(req, res)
  }

  public static update(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, (authErr: Error, user: IUser) => {
      const query = {
        createdBy: user._id,
        _id: req.params.id,
      }
      let errors: object[] = authErr ? [authErr] : []

      ContentModel.findOneAndUpdate(query, req.body, { new: true }, (err: Error, content: IContent | null) => {
        res.statusCode = err || content == null ? 406 : 200
        if (err) {
          errors.push(err)
        }
        res.json({ data: content, errors })
      })
    })(req, res)
  }

  public static async remove(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, async (err: Error, user: IUser) => {
      let errors: object[] = err ? [err] : []
      res.statusCode = 406

      try {
        const content = await ContentModel.findOne({ createdBy: user._id, _id: req.params.id })

        if (content) {
          await content.remove()
          res.statusCode = 204
        } else {
          res.statusCode = 404
        }
      } catch (err) {
        errors.push(err)
      }
      if (res.statusCode === 204) {
        res.json()
      } else {
        res.json({ data: null, errors })
      }
    })(req, res)
  }
}
