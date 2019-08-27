import { Request, Response } from 'express'

import { ActivityModel, IActivity } from '../db/activity.db'

export class ActivityController {
  public static getAll(_: Request, res: Response) {
    ActivityModel.find({}, async (err: Error, docs: IActivity[]) => {
      for (const doc of docs) {
        await doc
          .populate('content')
          .populate('location')
          .execPopulate()
      }
      res.status(200).json({ data: docs, errors: err })
    })
  }

  public static getById(req: Request, res: Response) {
    ActivityModel.findById(req.params.id, async (err: Error, doc: IActivity) => {
      res.statusCode = err || doc == null ? 404 : 200
      await doc
        .populate('content')
        .populate('location')
        .execPopulate()
      res.json({ data: doc, errors: err })
    })
  }

  public static create(req: Request, res: Response) {
    const activity = new ActivityModel(req.body)

    activity.save(async (err: Error, doc: IActivity) => {
      res.statusCode = err ? 406 : 201
      if (!err) {
        res.location(`/activity/${doc._id}`)
      }
      await doc
        .populate('content')
        .populate('location')
        .execPopulate()
      res.json({ data: doc, errors: err })
    })
  }

  public static update(req: Request, res: Response) {
    ActivityModel.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      async (err: Error, activity: IActivity | null) => {
        res.statusCode = err ? 404 : 200
        if (activity) {
          await activity
            .populate('content')
            .populate('location')
            .execPopulate()
        }
        res.json({ data: activity, errors: err })
      },
    )
  }

  public static async remove(req: Request, res: Response) {
    let errors: object | null = null
    res.statusCode = 406

    try {
      const activity = await ActivityModel.findById(req.params.id)
      if (activity) {
        await activity.remove()
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
