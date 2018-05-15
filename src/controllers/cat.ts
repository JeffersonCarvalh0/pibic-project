import { Request, Response } from 'express';

import { ICatModel, CatModel, ICat } from '../db/cat';

export class CatController {
    public static getAll(req: Request, res: Response) {
        CatModel.find({}, (err: Error, docs: ICatModel[]) => {
            res.status(200).json({"data": docs, "errors": err});
        });
    }

    public static getByName(req: Request, res: Response) {
        let catName: string = req.params.name;

        CatModel.findOne({ name: catName }, (err: Error, cat: ICat) => {
            res.statusCode = err || cat === null ? 404 : 200;
            res.json({"data": cat, "errors": err});
        });
    }

    public static create(req: Request, res: Response) {
        let cat = new CatModel(req.body);

        cat.save((err: Error) => {
            res.statusCode = err ? 403 : 201;
            res.location(`cat/${cat._id}`).json({"data": cat, "errors": err});
        });
    }

    public static update(req: Request, res: Response) {
        let update = req.body;
        let catId = req.params.id;
        let options = {new: true};

        CatModel.findByIdAndUpdate(catId, update, options, (err: Error, doc: ICatModel | null) => {
            res.statusCode = err ? 403 : 200;
            res.json({"data": doc, "errors": err});
        });
    }

    public static remove(req: Request, res: Response) {
        let catId = req.params.id;

        CatModel.findByIdAndRemove(catId, (err: Error) => {
            res.statusCode = err ? 404 : 204;
            res.json({"data": null, "errors": err});
        })
    }
}
