import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';

import { CatController } from '../controllers/cat.controller';

/** The app's routes */
export class CatsRoutes {
    public static create(router: Router) {
        router.get("/cat/:name", (req: Request, res: Response) => CatController.getByName(req, res));
        router.get("/cat/:id/createdBy", (req: Request, res: Response) => CatController.getCreatedBy(req, res));
        router.get("/cat", (req: Request, res: Response) => CatController.getAll(req, res));
        router.post("/cat", (req: Request, res: Response) => CatController.create(req, res));
        router.put("/cat/:id", (req: Request, res: Response) => CatController.update(req, res));
        router.delete("/cat/:id", (req: Request, res: Response) => CatController.remove(req, res));
    }
}
