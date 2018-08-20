import { Request, Response } from 'express';

import { ActivityModel, IActivity } from '../db/activity.db';

export class ActivityController {
    public static getAll(req: Request, res: Response) {
        ActivityModel.find({}, (err: Error, docs: IActivity[]) => {
            res.status(200).json({ data: docs, errors: err });
        });
    }

    public static getById(req: Request, res: Response) {
        ActivityModel.findById(req.params.id, (err: Error, doc: IActivity) => {
            res.statusCode = err || doc == null ? 404 : 200;
            res.json({ data: doc, errors: err });
        });
    }

    public static create(req: Request, res: Response) {
        let activity = new ActivityModel(req.body);

        activity.save((err: Error, doc: IActivity) => {
            res.statusCode = err ? 406 : 201;
            if (!err) res.location(`/activity/${doc._id}`);
            res.json({ data: doc, errors: err });
        });
    }

    public static update(req: Request, res: Response) {
        ActivityModel.findOneAndUpdate(req.params.id, req.body, { new: true }, (err: Error, activity: IActivity | null) => {
            res.statusCode = err ? 404 : 201;
            res.json({ data: activity, errors: err });
        });
    }

    public static remove(req: Request, res: Response) {
        ActivityModel.findOneAndRemove(req.params.id, (err: Error) => {
            res.statusCode = err ? 404 : 204;
            res.json({ data: null, errors: err });
        });
    }
}
