import { Request, Response } from 'express';
import passport from 'passport';

import { CatModel, ICat } from '../db/cat.db';
import { IUser, UserModel } from '../db/user.db';

/** Functions that will process the user's requests for cats */
export class CatController {
    /** Check if a cat was created by a user */
    // public static async checkCreated(): Promise<boolean> {
    //     return false;
    // }

    public static getAll(req: Request, res: Response) {
        CatModel.find({}, (err: Error, docs: ICat[]) => {
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

    public static async create(req: Request, res: Response) {
        let data: ICat | null = null;
        let errors: Object | null = null;
        res.statusCode = 403;

        try {
            let user = await passport.authenticate('jwt', {session: false});
            if (user) {
                console.log(user);
                let cat = req.body;
                cat.createdBy = user.username;
                cat = new CatModel(cat);
                cat = await cat.save();
                if (cat) { res.statusCode = 201; data = cat; res.location(`cat/${cat._id}`); }
            } else res.statusCode = 401;
        } catch (err) { errors = err; }
        res.json({ data: data, errors: errors });
    }

    public static async update(req: Request, res: Response) {
        let data: ICat | null = null;
        let errors: Object | null = null;
        res.statusCode = 403;

        try {
            let user = await passport.authenticate('jwt', {session: false});
            let cat = await CatModel.findById(req.params.id);
            if (user && cat) {
                if (user.username === cat.createdBy) {
                    await cat.update(req.body);
                    res.statusCode = 200; data = cat;
                }
                else res.statusCode = 401;
            }
        } catch (err) { errors = err; }
        res.json({ data: data, errors: errors });
    }

    public static async remove(req: Request, res: Response) {
        let errors: Object | null = null;
        res.statusCode = 404;

        try {
            let user = await passport.authenticate('jwt', {session: false});
            let cat = await CatModel.findById(req.params.id);
            if (user && cat) {
                if (user.username === cat.createdBy) {
                    await cat.remove();
                    res.statusCode = 204;
                }
                else res.statusCode = 401;
            }
        } catch (err) { errors = err }
        res.json({ data: null, errors: errors });
    }
}
