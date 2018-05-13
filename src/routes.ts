import { Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';

/** The app's routes */
export class CatsRoutes {
    public static create(router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send("Meow, bitch");
        });
    }
}
