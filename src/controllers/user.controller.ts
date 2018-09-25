import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from '../config';
import { IUser, UserModel } from '../db/user.db';

/** Functions to process the authentication requests */
export class UserController {
    public static login(req: Request, res: Response) {
        passport.authenticate('local', { session: false, failureFlash: true }, (err: Error, user: IUser) => {
            res.statusCode = err || !user ? 400 : 200;
            const token = user ? jwt.sign(user.toJSON(), config.SECRET, { expiresIn: '15m' }) : null;
            res.json({data: token, errors: err});
        })(req, res);
    }

    public static async register(req: Request, res: Response) {
        let user: IUser = new UserModel(req.body);

        user.save((err: Error, doc: IUser) => {
            res.statusCode = err ? 406 : 201;
            doc.password = "";
            res.json({data: doc, errors: err});
        });
    }

    public static testAuth(req: Request, res: Response) {
        passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
            res.statusCode = user ? 200 : 401;
            res.json({ data: req.user, errors: [] });
        })(req, res);
    }

    public static async remove(req: Request, res: Response) {
        passport.authenticate('jwt', {session: false}, async(err: Error, user: IUser) => {
            res.statusCode = user ? 201 : 401;
            if (user) await UserModel.findByIdAndRemove(user._id);
            res.json({ data: null, errors: err })
        })(req, res);
    }
}
