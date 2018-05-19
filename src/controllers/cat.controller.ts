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
            await passport.authenticate('jwt', {session: false}, async(err, user) => {
                if (err) throw err;
                if (user) {
                    let cat = req.body;
                    cat.createdBy = user.username;
                    cat = new CatModel(cat);
                    cat = await cat.save();
                    if (cat) { res.statusCode = 201; data = cat; res.location(`cat/${cat._id}`); }
                } else res.statusCode = 401;
                res.json({ data: data, errors: errors });
            })(req, res);
        } catch (err) { errors = err; }
    }

    public static async update(req: Request, res: Response) {
        let data: ICat | null = null;
        let errors: Object | null = null;
        res.statusCode = 403;

        try {
            await passport.authenticate('jwt', {session: false}, async(err, user) => {
                if (err) throw err;
                let cat = await CatModel.findById(req.params.id);
                if (user && cat) {
                    if (user.username === cat.createdBy) {
                        data = await CatModel.findOneAndUpdate(req.params.id, req.body, {new: true});
                        res.statusCode = 200;
                    } else res.statusCode = 401;
                } else if (!user) res.statusCode = 401;
                res.json({ data: data, errors: errors });
            })(req, res);
        } catch (err) { errors = err; }
    }

    public static async remove(req: Request, res: Response) {
        let errors: Object | null = null;
        res.statusCode = 404;

        try {
            await passport.authenticate('jwt', {session: false}, async(err, user) => {
                if (err) throw err;
                let cat = await CatModel.findById(req.params.id);
                if (user && cat) {
                    if (user.username === cat.createdBy) {
                        await cat.remove();
                        res.statusCode = 204;
                    }
                    else res.statusCode = 401;
                }
                res.json({ data: null, errors: errors });
            })(req, res);
        } catch (err) { errors = err }
    }
}
