import { Request, Response, NextFunction, Router } from 'express';
import mongoose from 'mongoose';

import { CatController } from '../controllers/cat';

/** The app's routes */
export class CatsRoutes {
    public static create(router: Router) {
        router.get("/", (req: Request, res: Response) => (CatController.root(req, res)));
        router.get("/cats/:name", (req: Request, res: Response) => CatController.getByName(req, res));
        router.post("/cats", (req: Request, res: Response) => CatController.post(req, res));
    }
}
