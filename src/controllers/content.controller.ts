import { Request, Response } from 'express'
import passport from 'passport'

import { ContentModel, IContent } from '../db/content.db'
import { IUser } from '../db/user.db'

export class ContentController {
  public static getAll(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, (_: Error, user: IUser) => {
      if (user) {
        ContentModel.find({ createdBy: user._id }, (err: Error, docs: IContent[]) => {
          res.status(200).json({ data: docs, errors: err })
        })
      }
    })(req, res)
  }

  public static getById(req: Request, res: Response) {
    const contentId = req.params.id

    passport.authenticate('jwt', { session: false }, (_: Error, user: IUser) => {
      if (user) {
        ContentModel.findOne({ createdBy: user._id, _id: contentId }, (err: Error, content: IContent) => {
          res.statusCode = err || content == null ? 404 : 200
          res.json({ data: content, errors: err })
        })
      }
    })(req, res)
  }

  public static create(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, (_: Error, user: IUser) => {
      const content = new ContentModel({ ...req.body, createdBy: user._id })

      content.save((err: Error, doc: IContent) => {
        res.statusCode = err ? 406 : 201
        if (!err) {
          res.location(`/content/${doc._id}`)
        }
        res.json({ data: doc, errors: err })
      })
    })(req, res)
  }

  public static update(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, (_: Error, user: IUser) => {
      const query = {
        createdBy: user._id,
        _id: req.params.id,
      }

      ContentModel.findOneAndUpdate(query, req.body, { new: true }, (err: Error, content: IContent | null) => {
        res.statusCode = err || content == null ? 406 : 200
        res.json({ data: content, errors: err })
      })
    })(req, res)
  }

  public static async remove(req: Request, res: Response) {
    passport.authenticate('jwt', { session: false }, async (_: Error, user: IUser) => {
      let errors: object | null = null
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
        errors = err
      }
      if (res.statusCode === 204) {
        res.json()
      } else {
        res.json({ data: null, errors })
      }
    })(req, res)
  }
}
