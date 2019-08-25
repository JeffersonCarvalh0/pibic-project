import { Request, Response } from 'express'

import { ContentModel, IContent } from '../db/content.db'

export class ContentController {
  public static getAll(_: Request, res: Response) {
    ContentModel.find({}, (err: Error, docs: IContent[]) => {
      res.status(200).json({ data: docs, errors: err })
    })
  }

  public static getById(req: Request, res: Response) {
    const contentId = req.params.id

    ContentModel.findById(contentId, (err: Error, content: IContent) => {
      res.statusCode = err || content == null ? 404 : 200
      res.json({ data: content, errors: err })
    })
  }

  public static create(req: Request, res: Response) {
    const content = new ContentModel(req.body)
    content.save((err: Error, doc: IContent) => {
      res.statusCode = err ? 406 : 201
      if (!err) {
        res.location(`/content/${doc._id}`)
      }
      res.json({ data: doc, errors: err })
    })
  }

  public static update(req: Request, res: Response) {
    ContentModel.findOneAndUpdate(req.params.id, req.body, { new: true }, (err: Error, content: IContent | null) => {
      res.statusCode = err || content == null ? 406 : 200
      res.json({ data: content, errors: err })
    })
  }

  public static async remove(req: Request, res: Response) {
    let errors: object | null = null
    res.statusCode = 406

    try {
      const content = await ContentModel.findById(req.params.id)
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
  }
}
