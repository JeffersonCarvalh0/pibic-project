import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from '../config';
import { IUserModel, UserModel } from '../db/user.db';

/** Functions to process the authentication requests */
export class AuthController {
    public static login(req: Request, res: Response) {
        passport.authenticate('local', { session: false }, (err: Error, user: IUserModel) => {
            res.statusCode = err || !user ? 400 : 200;
            const token = user ? jwt.sign(user.toJSON(), config.SECRET) : null;
            res.json({data: token, errors: err});
        })(req, res);
    }

    public static register(req: Request, res: Response) {
        let user = new UserModel(req.body);

        user.save((err: Error) => {
            res.statusCode = err ? 403 : 201;
            res.json({data: "Success", errors: err});
        });
    }

    public static testAuth(req: Request, res: Response) {
        passport.authenticate('jwt', { session: false }, (err: Error, user: IUserModel) => {
            res.statusCode = err || !user ? 401 : 200;
            res.json({data: user, errors: err});
        })(req, res);
    }
}
