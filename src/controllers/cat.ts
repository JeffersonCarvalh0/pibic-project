import { Request, Response } from 'express';

import { CatModel, ICat } from '../db/cat';

export class CatController {
    public static root(req: Request, res: Response) {
        res.status(200).send('Meow, b1tch');
    }

    public static getByName(req: Request, res: Response) {
        let catName: string = req.params.name;

        CatModel.findOne({ name: catName }, (err: Error, cat: ICat) => {
            res.statusCode = err || cat === null ? 404 : 200;
            res.json({"data": cat, "errors": err});
        });
    }

    public static post(req: Request, res: Response) {
        let cat = new CatModel(req.body);

        cat.save((err: Error) => {
            res.statusCode = err ? 403 : 201;
            res.location(`cats/${cat._id}`).json({"data": cat, "errors": err});
        });
    }
}
