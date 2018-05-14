import { Request, Response } from 'express';

import { CatModel, ICat } from '../db/cat';

export class CatController {
    public static root(req: Request, res: Response) {
        res.send('Meow, b1tch');
    }

    public static post(req: Request, res: Response) {
        let cat = new CatModel({
            name: req.body.name,
            color: req.body.color,
            age: req.body.age
        });

        cat.save((err: Error) => {
            if (err) res.send(`Operation failed. ${err.toString()}`);
            else res.send(`Cat successfully saved with id ${cat._id}`);
        });
    }

    public static get(req: Request, res: Response) {
        let catName: string = req.params.name;
        CatModel.findOne({ name: catName }, (err: Error, cat: ICat) => {
            res.send(err || cat);
        });
    }
}
