import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from '../config';
import { IUser, UserModel } from '../db/user.db';

/** Functions to process the authentication requests */
export class AuthController {
    public static login(req: Request, res: Response) {
        passport.authenticate('local', { session: false, failureFlash: true }, (err: Error, user: IUser) => {
            res.statusCode = err || !user ? 400 : 200;
            const token = user ? jwt.sign(user.toJSON(), config.SECRET, { expiresIn: '15m' }) : null;
            res.json({data: token, errors: err});
        })(req, res);
    }

    public static register(req: Request, res: Response) {
        let user = new UserModel(req.body);

        user.save((err: Error) => {
            res.statusCode = err ? 403 : 201;
            let data: string = err ? "" : "success";
            res.json({data: data, errors: err});
        });
    }

    public static testAuth(req: Request, res: Response) {
        res.status(200).json({ data: req.user, errors: [] });
    }
}
